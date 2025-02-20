#!/bin/bash

# Create SSH directory with proper permissions
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add private key
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add host to known_hosts
ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

# Generate public key for verification
ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
