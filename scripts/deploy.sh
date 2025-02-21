#!/bin/bash

# Exit on any error
set -e

# Ensure directory exists on remote server
ssh -o StrictHostKeyChecking=no root@$WEB_SERVER_SSH_HOST "mkdir -p $COMPOSE_FILE_DIR"

# Copy docker-compose file to server
scp -o StrictHostKeyChecking=no \
    -r ./docker-compose.development.yaml \
    root@$WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

# Execute deployment commands on remote server
ssh -o StrictHostKeyChecking=no root@$WEB_SERVER_SSH_HOST << 'EOF'
    # Exit on any error
    set -e

    # Export registry credentials
    export REGISTRY_USERNAME=$REGISTRY_USERNAME
    export REGISTRY_PASSWORD=$REGISTRY_PASSWORD

    # Clean up unused Docker resources
    docker system prune -af

    # Login to registry
    echo $REGISTRY_PASSWORD | docker login sjc.vultrcr.com -u $REGISTRY_USERNAME --password-stdin

    # Pull and deploy new containers
    cd $COMPOSE_FILE_DIR
    docker compose -f $COMPOSE_FILE_NAME pull
    docker compose -f $COMPOSE_FILE_NAME up -d

    # Wait for containers to start and show status
    sleep 5
    docker ps -a

    # Logout from registry
    docker logout sjc.vultrcr.com
EOF
