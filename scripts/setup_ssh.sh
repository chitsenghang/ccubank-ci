#!/bin/bash

set -x

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo -e "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub

ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa -vvv root@$WEB_SERVER_SSH_HOST "echo 'SSH connection successful'"

set +x
