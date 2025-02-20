#!/bin/bash
mkdir -p ~/.ssh
echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan -H $WEB_SERVER_SSH_HOST >> ~/.ssh/known_hosts
