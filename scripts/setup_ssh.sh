#!/bin/bash
set -e

mkdir -p ~/.ssh
chmod 700 ~/.ssh

echo -e "Host *\n\tStrictHostKeyChecking no\n\tUserKnownHostsFile /dev/null\n\n" > ~/.ssh/config

echo "$SH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
