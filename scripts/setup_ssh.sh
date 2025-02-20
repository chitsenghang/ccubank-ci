#!/bin/bash
set -x  # Enable debug mode

# Create SSH directory
mkdir -p ~/.ssh

# Add private key with proper newlines
echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add host to known_hosts
ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

# Debug: Show key permissions and contents (redacted)
ls -la ~/.ssh/id_rsa
ssh-keygen -l -f ~/.ssh/id_rsa
