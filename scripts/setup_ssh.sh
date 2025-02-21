#!/bin/bash
set -e

SSH_PASS="$SSH_PASSWORD"
SSH_HOST="$WEB_SERVER_SSH_HOST"

apt-get update && apt-get install -y sshpass

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo -e "Host *\n\tStrictHostKeyChecking no\n\tUserKnownHostsFile /dev/null\n\n" > ~/.ssh/config

echo "Connecting to the server..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SSH_HOST" "echo 'Connected successfully!'"
