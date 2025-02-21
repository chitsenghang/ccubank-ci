#!/bin/bash
set -e  # Exit on error

REMOTE_DIR="/root/ccubank"
COMPOSE_FILE="docker-compose.development.yaml"

ssh -o StrictHostKeyChecking=no user@${WEB_SERVER_SSH_HOST} << EOF
    mkdir -p $REMOTE_DIR
EOF

scp -o StrictHostKeyChecking=no docker-compose.development.yaml root@${WEB_SERVER_SSH_HOST}:$REMOTE_DIR/

ssh -o StrictHostKeyChecking=no user@${WEB_SERVER_SSH_HOST} << EOF
    cd $REMOTE_DIR
    docker-compose -f $COMPOSE_FILE pull
    docker-compose -f $COMPOSE_FILE up -d --remove-orphans
EOF
