#!/bin/bash

# Exit on any error
set -e

# Configuration variables (set these as GitHub secrets)
SERVER_HOST="${{ secrets.SERVER_HOST }}"
SERVER_USER="${{ secrets.SERVER_USER }}"
SSH_PRIVATE_KEY="${{ secrets.SSH_PRIVATE_KEY }}"
SSH_PORT="${{ secrets.SSH_PORT:-22}"  # Default to port 22 if not specified

# Create SSH directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH private key to file
echo "$SSH_PRIVATE_KEY" > ~/.ssh/deploy_key
chmod 600 ~/.ssh/deploy_key

# Add server's host key to known_hosts to prevent first-time connection prompts
# Using ssh-keyscan to get the host key
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

# Test the connection
echo "Testing SSH connection..."
ssh deployment_target 'echo "SSH connection successful"'
