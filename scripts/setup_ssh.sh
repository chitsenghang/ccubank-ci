#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Extract the server IP or hostname
SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)

# Ensure .ssh directory exists with correct permissions
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Save the private key securely
echo "$WEB_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Start the SSH agent and add the private key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Ensure known_hosts file exists
touch ~/.ssh/known_hosts
chmod 644 ~/.ssh/known_hosts

# Scan and add the server to known_hosts only if missing
if ! grep -q "$SERVER_IP" ~/.ssh/known_hosts; then
  ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts 2>/dev/null
fi

# Test SSH connection
echo "Testing SSH connection to $WEB_SERVER_SSH_HOST..."
ssh -o BatchMode=yes -o StrictHostKeyChecking=no "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful!'"

echo "SSH setup completed successfully!"
