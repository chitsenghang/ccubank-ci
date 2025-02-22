#!/bin/bash

set -eu

SSH_PORT="${SSH_PORT:-22}"
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.development.yaml}"
COMPOSE_FILE_DIR="${COMPOSE_FILE_DIR:-/path/to/compose/dir}"

mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Ensure private key is provided and handle multiline correctly
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# Add remote host to known_hosts
ssh-keyscan -p "$SSH_PORT" -H "$SERVER_HOST" >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Configure SSH for deployment target
cat > ~/.ssh/config << EOF
Host deployment_target
    HostName $SERVER_HOST
    User $SERVER_USER
    Port $SSH_PORT
    IdentityFile ~/.ssh/deploy_key
    StrictHostKeyChecking yes
    UserKnownHostsFile ~/.ssh/known_hosts
EOF
chmod 600 ~/.ssh/config

# Remote command function
remote_command() {
    ssh -p "$SSH_PORT" -i ~/.ssh/deploy_key "$SERVER_USER@$SERVER_HOST" "$1"
}

# Ensure the compose directory exists and set permissions
remote_command "
    if [ ! -d \"$COMPOSE_FILE_DIR\" ]; then
        mkdir -p \"$COMPOSE_FILE_DIR\"
        echo 'Directory created successfully'
    else
        echo 'Directory already exists'
    fi
    chmod 755 \"$COMPOSE_FILE_DIR\"
"

# Copy the docker-compose file
scp -P "$SSH_PORT" -i ~/.ssh/deploy_key \
    "$COMPOSE_FILE_NAME" \
    "$SERVER_USER@$SERVER_HOST:$COMPOSE_FILE_DIR/"

# Optionally, source an .env file if it exists
if [ -f "$COMPOSE_FILE_DIR/.env" ]; then
    export $(grep -v '^#' "$COMPOSE_FILE_DIR/.env" | xargs)
else
    # Fall back to default values
    export DB_HOST="db"
    export DB_PORT="5432"
    export DB_USER="postgres"
    export DB_PASSWORD="root"
    export DB_DATABASE="ccubank"
fi

# Log in to Docker registry
remote_command "docker login $REGISTRY -u $REGISTRY_USERNAME -p $REGISTRY_TOKEN"

# Deploy using Docker Compose
remote_command "cd $COMPOSE_FILE_DIR && \
    docker-compose -f $COMPOSE_FILE_NAME pull && \
    docker-compose -f $COMPOSE_FILE_NAME up -d"

echo "Deployment completed successfully!"
