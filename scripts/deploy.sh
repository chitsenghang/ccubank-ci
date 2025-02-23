#!/bin/bash

set -eu

SSH_PORT="${SSH_PORT:-22}"
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.development.yaml}"

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

ssh-keyscan -p "$SSH_PORT" -H "$SERVER_HOST" >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

cat > ~/.ssh/config << EOF
Host deployment_target
    HostName $SERVER_HOST
    User $SERVER_USER
    Port $SSH_PORT
    IdentityFile ~/.ssh/deploy_key
    StrictHostKeyChecking accept-new
    UserKnownHostsFile ~/.ssh/known_hosts
EOF

chmod 600 ~/.ssh/config

remote_command() {
    ssh -p "$SSH_PORT" -i ~/.ssh/deploy_key "$SERVER_USER@$SERVER_HOST" "$1"
}

remote_command "
    if [ ! -d \"$COMPOSE_FILE_DIR\" ]; then
        mkdir -p \"$COMPOSE_FILE_DIR\"
        echo 'Directory created successfully'
    else
        echo 'Directory already exists'
    fi
    chmod 755 \"$COMPOSE_FILE_DIR\"
"
scp -P "$SSH_PORT" -i ~/.ssh/deploy_key \
    "$COMPOSE_FILE_NAME" \
    "$SERVER_USER@$SERVER_HOST:$COMPOSE_FILE_DIR/"

remote_command "docker login $REGISTRY -u $REGISTRY_USERNAME -p $REGISTRY_TOKEN"

remote_command "cd $COMPOSE_FILE_DIR && \
    export NODE_ENV=production && \
    export DB_USER=postgres && \
    export DB_PASSWORD=root && \
    export DB_DATABASE=ccubank && \
    NODE_ENV=production docker-compose -f $COMPOSE_FILE_NAME down -v && \
    docker-compose -f $COMPOSE_FILE_NAME pull && \
    NODE_ENV=production docker-compose -f $COMPOSE_FILE_NAME up -d"

echo "Deployment completed successfully"
