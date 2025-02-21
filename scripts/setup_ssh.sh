#!/bin/bash

mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Ensure SSH key is formatted correctly
echo -e "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Generate public key for verification
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub

# Test SSH connection
ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -v root@$WEB_SERVER_SSH_HOST "echo 'SSH connection successful'"
