#!/bin/bash

# Ensure the compose file exists locally
if [[ ! -f ./docker-compose.development.yml ]]; then
    echo "Error: docker-compose.development.yml does not exist!"
    exit 1
fi

# Copy the compose file to the server
mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H "${{ secrets.WEB_SERVER_SSH_HOST }}" >> ~/.ssh/known_hosts

scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r ./docker-compose.development.yml $WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

# Execute deployment commands on the remote server
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $WEB_SERVER_SSH_HOST << EOF
    export REGISTRY_USERNAME=$REGISTRY_USERNAME
    export REGISTRY_PASSWORD=$REGISTRY_PASSWORD
    docker system prune -af
    echo $REGISTRY_PASSWORD | docker login sjc.vultrcr.com -u $REGISTRY_USERNAME --password-stdin
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME pull
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME up -d

    # Debugging: Check running containers
    sleep 5
    docker ps -a
EOF
