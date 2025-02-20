#!/bin/bash

echo "Ensuring the compose directory exists on the server..."
ssh -o StrictHostKeyChecking=no "$WEB_SERVER_SSH_HOST" "mkdir -p $COMPOSE_FILE_DIR"

echo "Copying docker-compose.yaml and necessary files to the server..."
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/hang/null -r ./docker-compose.development.yaml $WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

echo "Deployment completed successfully. $COMPOSE_FILE_NAME - $WEB_SERVER_SSH_HOST"
