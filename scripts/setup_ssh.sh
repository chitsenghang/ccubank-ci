#!/bin/bash

# Exit on any error and undefined variables
set -eu

echo "Starting deployment setup..."

# Configuration variables
SSH_PORT="${SSH_PORT:-22}"  # Default to port 22 if not specified
COMPOSE_FILE_DIR="${COMPOSE_FILE_DIR:-./ccubank}"
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.development.yaml}"

# Create SSH directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH private key to file
echo "$SSH_PRIVATE_KEY" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# Add server's host key to known_hosts
echo "Adding host key..."
ssh-keyscan -p "$SSH_PORT" -H "$SERVER_HOST" >> ~/.ssh/known_hosts

# Configure SSH with custom settings
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

# Function to handle SSH commands with retry
ssh_command() {
    local retries=3
    local command=$1

    for (( i=1; i<=retries; i++ )); do
        if ssh deployment_target "$command"; then
            return 0
        fi
        echo "Attempt $i failed. Retrying..."
        sleep 5
    done
    echo "Failed after $retries attempts"
    return 1
}

# Function to handle SCP transfers with retry
scp_transfer() {
    local retries=3
    local source=$1
    local dest=$2

    for (( i=1; i<=retries; i++ )); do
        if scp -P "$SSH_PORT" "$source" "deployment_target:$dest"; then
            return 0
        fi
        echo "Attempt $i failed. Retrying..."
        sleep 5
    done
    echo "Failed after $retries attempts"
    return 1
}

# Main deployment process
main() {
    # Test SSH connection
    echo "Testing SSH connection..."
    ssh_command "echo 'SSH connection successful'" || exit 1

    # Create remote directory
    echo "Creating remote directory..."
    ssh_command "mkdir -p $COMPOSE_FILE_DIR" || exit 1

    # Copy docker-compose file
    echo "Copying docker-compose file..."
    scp_transfer "$COMPOSE_FILE_NAME" "$COMPOSE_FILE_DIR/" || exit 1

    # Login to container registry
    echo "Logging into container registry..."
    ssh_command "docker login -u $REGISTRY_USERNAME -p $REGISTRY_TOKEN" || exit 1

    # Deploy using docker-compose
    echo "Deploying application..."
    ssh_command "cd $COMPOSE_FILE_DIR && \
                docker-compose -f $COMPOSE_FILE_NAME pull && \
                docker-compose -f $COMPOSE_FILE_NAME up -d" || exit 1

    echo "Deployment completed successfully!"
}

# Cleanup function
cleanup() {
    local exit_code=$?
    if [ $exit_code -ne 0 ]; then
        echo "Deployment failed with exit code $exit_code"
    fi
    exit $exit_code
}

# Set cleanup trap
trap cleanup EXIT

# Run main function
main
