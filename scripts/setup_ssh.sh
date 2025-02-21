#!/bin/bash

set -x

mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Ensure SSH key is formatted correctly
echo -e "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add server to known_hosts
ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

# Generate public key for verification
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub

# Test SSH connection
ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -vvv root@$WEB_SERVER_SSH_HOST "echo 'SSH connection successful'"

set +x  # Disable debug mode
