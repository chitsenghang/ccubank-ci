#!/bin/bash
set -e

eval $(ssh-agent -s)

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo "$WEB_SERVER_SSH_PRIVATE_KEY" | tr -d '\r' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-add ~/.ssh/id_rsa

SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)
ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts 2>/dev/null

echo "Debug: Checking SSH configuration"
echo "SSH directory permissions:"
ls -la ~/.ssh/
echo "Key fingerprint:"
ssh-keygen -lf ~/.ssh/id_rsa

echo "Testing SSH connection with verbose logging..."
ssh -v -o BatchMode=yes \
    -o StrictHostKeyChecking=no \
    -o PubkeyAuthentication=yes \
    -o PasswordAuthentication=no \
    -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful'"
