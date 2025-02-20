#!/bin/bash

echo "Ensuring the compose directory exists on the server..."
ssh -o StrictHostKeyChecking=no "$WEB_SERVER_SSH_HOST" "mkdir -p $COMPOSE_FILE_DIR"

echo "Copying docker-compose.yaml and necessary files to the server..."
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/hang/null -r ./docker-compose.yaml $WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

#REGISTRY="sjc.vultrcr.com"
#IMAGE_NAME="hangregistry469/ccubank-core"
#TAG="latest"
#CONTAINER_NAME="ccubank-core"
#
#echo "Pulling the latest image from $REGISTRY/$IMAGE_NAME:$TAG..."
#docker pull $REGISTRY/$IMAGE_NAME:$TAG

#echo "Stopping and removing any existing container..."
#docker stop $CONTAINER_NAME || true
#docker rm $CONTAINER_NAME || true

#echo "Starting a new container..."
#docker run -d --name $CONTAINER_NAME -p 8000:8000 $REGISTRY/$IMAGE_NAME:$TAG

#echo "Cleaning up unused Docker images..."
#docker system prune -af

echo "Deployment completed successfully."
