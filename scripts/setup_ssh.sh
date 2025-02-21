#!/bin/bash

set -x  # Enable debug mode

mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Ensure SSH key is formatted correctly
echo -e "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Verify key content (only first 5 lines for security)
head -n 5 ~/.ssh/id_rsa

# Add server to known_hosts
ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

# Generate public key for verification
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
