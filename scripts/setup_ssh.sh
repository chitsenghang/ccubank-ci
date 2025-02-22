#!/bin/bash

# Exit on any error and undefined variables
set -eu

echo "Starting deployment setup..."

# Configuration variables
SSH_PORT="${SSH_PORT:-22}"
COMPOSE_FILE_DIR="ccubank"  # Fixed directory name
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.development.yaml}"

# Create SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH private key
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# Add server's host key
ssh-keyscan -p "$SSH_PORT" -H "$SERVER_HOST" >> ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Configure SSH
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

# Function to execute remote commands with error handling
remote_command() {
    ssh -p "$SSH_PORT" -i ~/.ssh/deploy_key "$SERVER_USER@$SERVER_HOST" "$1"
}

# Create and setup remote directory
echo "Setting up remote directory..."
remote_command "
    # Create directory if it doesn't exist
    if [ ! -d \"$COMPOSE_FILE_DIR\" ]; then
        mkdir -p \"$COMPOSE_FILE_DIR\"
        echo 'Directory created successfully'
    else
        echo 'Directory already exists'
    fi

    # Set proper permissions
    chmod 755 \"$COMPOSE_FILE_DIR\"

    # Show directory status
    ls -la \"$COMPOSE_FILE_DIR\"
"

# Copy docker-compose file
echo "Copying docker-compose file..."
scp -P "$SSH_PORT" -i ~/.ssh/deploy_key \
    "$COMPOSE_FILE_NAME" \
    "$SERVER_USER@$SERVER_HOST:$COMPOSE_FILE_DIR/"

# Login to container registry
echo "Logging into container registry..."
remote_command "docker login -u $REGISTRY_USERNAME -p $REGISTRY_TOKEN"

# Deploy application
echo "Deploying application..."
remote_command "cd $COMPOSE_FILE_DIR && \
    docker-compose -f $COMPOSE_FILE_NAME pull && \
    docker-compose -f $COMPOSE_FILE_NAME up -d"

echo "Deployment completed successfully!"
