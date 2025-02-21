#!/bin/bash
set -e

# Start SSH agent and add key
eval $(ssh-agent -s)

# Create SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH key with proper formatting
echo "$WEB_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add key to agent
ssh-add ~/.ssh/id_rsa

# Extract IP and add to known hosts
SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)
ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts 2>/dev/null

# Debug information
echo "Debug: Checking SSH configuration"
echo "SSH directory permissions:"
ls -la ~/.ssh/
echo "Key fingerprint:"
ssh-keygen -lf ~/.ssh/id_rsa

# Test connection with verbose output
echo "Testing SSH connection with verbose logging..."
ssh -v -o BatchMode=yes \
    -o StrictHostKeyChecking=no \
    -o PubkeyAuthentication=yes \
    -o PasswordAuthentication=no \
    -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful'"
