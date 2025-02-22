#!/bin/bash

# Exit on any error and undefined variables
set -eu

# Enable debug mode for SSH
export SSH_DEBUG_MODE="true"

echo "Starting deployment setup..."

# Configuration variables
SSH_PORT="${SSH_PORT:-22}"  # Default to port 22 if not specified
COMPOSE_FILE_DIR="${COMPOSE_FILE_DIR:-./ccubank}"
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.development.yaml}"

echo "Checking configuration..."
echo "SERVER_HOST: ${SERVER_HOST}"
echo "SERVER_USER: ${SERVER_USER}"
echo "SSH_PORT: ${SSH_PORT}"
echo "COMPOSE_FILE_DIR: ${COMPOSE_FILE_DIR}"
echo "SSH_PRIVATE_KEY exists: $([ ! -z "${SSH_PRIVATE_KEY}" ] && echo 'Yes' || echo 'No')"

# Create SSH directory and set permissions
echo "Setting up SSH directory..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH private key to file with proper formatting
echo "Writing SSH key..."
# Ensure the key starts with -----BEGIN and ends with -----END
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# Debug: Check key format
echo "Validating SSH key format..."
if ! grep -q "BEGIN .* PRIVATE KEY" ~/.ssh/deploy_key; then
    echo "Error: Invalid SSH key format"
    echo "Key should start with '-----BEGIN ... PRIVATE KEY-----'"
    exit 1
fi

# Add server's host key with verbose output
echo "Adding host key..."
if ! ssh-keyscan -v -p "$SSH_PORT" -H "$SERVER_HOST" >> ~/.ssh/known_hosts 2>&1; then
    echo "Warning: ssh-keyscan had issues, but continuing..."
fi
chmod 644 ~/.ssh/known_hosts

# Configure SSH with custom settings and verbose logging
echo "Configuring SSH..."
cat > ~/.ssh/config << EOF
Host deployment_target
    HostName $SERVER_HOST
    User $SERVER_USER
    Port $SSH_PORT
    IdentityFile ~/.ssh/deploy_key
    StrictHostKeyChecking accept-new
    UserKnownHostsFile ~/.ssh/known_hosts
    LogLevel DEBUG3
EOF

chmod 600 ~/.ssh/config

# Test SSH key permissions
echo "Checking SSH key permissions..."
ls -la ~/.ssh/deploy_key
ls -la ~/.ssh/config

# Test the connection with verbose output
echo "Testing SSH connection..."
ssh -v deployment_target 'echo "SSH connection successful"' || {
    echo "SSH connection failed. Debugging information:"
    echo "1. Checking if key exists:"
    ls -la ~/.ssh/
    echo "2. Checking key format:"
    head -n 1 ~/.ssh/deploy_key
    echo "3. Testing connection with verbose output:"
    ssh -v -i ~/.ssh/deploy_key -p "$SSH_PORT" "$SERVER_USER@$SERVER_HOST" 'echo test' 2>&1
    exit 1
}

# Rest of your deployment script...
# Main deployment process
main() {
    echo "Starting deployment..."
    # Your existing deployment commands here
}

# Run main function
main
