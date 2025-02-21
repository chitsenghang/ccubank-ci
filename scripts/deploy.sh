#!/bin/bash

# deploy.sh
set -e

echo "Starting deployment process..."

# Create remote directory if it doesn't exist
ssh -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "mkdir -p $COMPOSE_FILE_DIR"

# Copy docker-compose file to remote server
echo "Copying docker-compose file..."
scp -i ~/.ssh/id_rsa "$COMPOSE_FILE_NAME" \
    "$WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/"

# Login to container registry
echo "Logging into container registry..."
ssh -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" \
    "docker login -u $REGISTRY_USERNAME -p $REGISTRY_TOKEN"

# Pull and deploy using docker-compose
echo "Deploying application..."
ssh -i ~/.ssh/id_rsa "$WEB_SERVER_SSH_HOST" "cd $COMPOSE_FILE_DIR && \
    docker-compose -f $COMPOSE_FILE_NAME pull && \
    docker-compose -f $COMPOSE_FILE_NAME up -d"

echo "Deployment completed successfully!"
