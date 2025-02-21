#!/bin/bash

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo "$SSH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

ssh-keyscan -H "$WEB_SERVER_SSH_HOST" >> ~/.ssh/known_hosts

ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub
