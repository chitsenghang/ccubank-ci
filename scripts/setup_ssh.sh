#!/bin/bash

set -e

SERVER_IP=$(echo "$WEB_SERVER_SSH_HOST" | cut -d '@' -f2)

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo "$WEB_SERVER_SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H "$SERVER_IP" >> ~/.ssh/known_hosts

echo "Testing SSH connection..."
ssh -o BatchMode=yes -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "echo 'SSH connection successful'"
