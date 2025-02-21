#!/bin/bash

# setup_ssh.sh
set -e

# Extract IP from WEB_SERVER_SSH_HOST
SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)

# Create SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write SSH private key
echo "$WEB_SERVER_SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add host key to known hosts
ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts

# Test SSH connection
echo "Testing SSH connection..."
ssh -o BatchMode=yes -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful'"
