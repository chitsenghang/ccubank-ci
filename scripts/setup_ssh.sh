#!/bin/bash

# Exit on any error
set -e

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Verify required environment variables
if [ -z "$WEB_SERVER_SSH_HOST" ]; then
    log "Error: WEB_SERVER_SSH_HOST is not set"
    exit 1
fi

if [ -z "$WEB_SERVER_SSH_PRIVATE_KEY" ]; then
    log "Error: WEB_SERVER_SSH_PRIVATE_KEY is not set"
    exit 1
fi

# Extract IP from WEB_SERVER_SSH_HOST
SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)
log "Setting up SSH for server: $SERVER_IP"

# Create and set permissions for SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh
log "Created SSH directory with proper permissions"

# Write private key
echo "$WEB_SERVER_SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
log "Written SSH private key with proper permissions"

# Add host key to known hosts
ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts 2>/dev/null
log "Added server to known hosts"

# Test SSH connection
log "Testing SSH connection..."
if ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful'" 2>/dev/null; then
    log "SSH connection test successful"
else
    log "SSH connection test failed"
    # Output debug information
    ssh -v -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'test'" 2>&1
    exit 1
fi
