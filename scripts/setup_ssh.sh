#!/bin/bash
set -e

# Ensure the required environment variables are set
if [[ -z "$SSH_PASSWORD" || -z "$WEB_SERVER_SSH_HOST" ]]; then
    echo "Error: SSH_PASSWORD or WEB_SERVER_SSH_HOST not set!"
    exit 1
fi

SSH_PASS="$SSH_PASSWORD"
SSH_HOST="$WEB_SERVER_SSH_HOST"

echo "Installing sshpass..."
sudo apt-get update && sudo apt-get install -y sshpass

# Setup SSH directory and configuration
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# SSH config to prevent interactive prompts
echo -e "Host *\n\tStrictHostKeyChecking no\n\tUserKnownHostsFile /dev/null\n\n" > ~/.ssh/config

# Use sshpass to connect via SSH
echo "Connecting to the server..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SSH_HOST" "echo 'Connected successfully!'"
