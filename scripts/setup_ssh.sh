mkdir -p ~/.ssh

chmod 700 ~/.ssh

ssh-keyscan -H $WEB_SERVER_SSH_HOST >> ~/.ssh/known_hosts

echo "$WEB_SERVER_SSH_PRIVATE_KEY" > ~/.ssh/id_rsa

chmod 600 ~/.ssh/id_rsa
