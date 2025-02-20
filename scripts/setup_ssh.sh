#!/bin/bash

# Create .ssh directory and set correct permissions
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Write the private key to a file
echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Add host to known_hosts to prevent interactive confirmation
ssh-keyscan -H "${WEB_SERVER_SSH_HOST}" >> ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa

echo "✅ SSH private key setup completed."
