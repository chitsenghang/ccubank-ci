#!/bin/bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
echo $SSH_PRIVATE_KEY | sed 's/-----BEGIN RSA PRIVATE KEY-----/''/g; s/ -----END RSA PRIVATE KEY-----/''/g' | sed 's/ /\n/g' | sed '1s/$/'"-----BEGIN RSA PRIVATE KEY-----"'/' > server-private-key.pem
echo -n "-----END RSA PRIVATE KEY-----" >> server-private-key.pem
chmod 600 server-private-key.pem
cp server-private-key.pem ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
