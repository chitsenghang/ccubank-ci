#!/bin/bash

scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r ./docker-compose.development.yml $WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

ssh $WEB_SERVER_SSH_HOST << EOF
    docker system prune -af
    docker login sjc.vultrcr.com -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME pull
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME up -d
EOF
sleep 30
