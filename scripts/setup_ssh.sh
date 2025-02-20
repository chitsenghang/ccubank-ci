#!/bin/bash
set -e  # Exit on error

# Create SSH directory
mkdir -p ~/.ssh

# Add private key
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add host to known_hosts
ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts
