#!/bin/bash
set -eu

SSH_PORT="${SSH_PORT:-22}"
COMPOSE_FILE_NAME="${COMPOSE_FILE_NAME:-docker-compose.yaml}"
source ./scripts/ssh_setup.sh
setup_ssh
remote_cmd() {
    ssh -p "$SSH_PORT" -i ~/.ssh/deploy_key "$SERVER_USER@$SERVER_HOST" "$1"
}
#remote_cmd "mkdir -p \"$COMPOSE_FILE_DIR\" && chmod 755 \"$COMPOSE_FILE_DIR\""
scp -P "$SSH_PORT" -i ~/.ssh/deploy_key \
    "$COMPOSE_FILE_NAME" \
    "$SERVER_USER@$SERVER_HOST:$COMPOSE_FILE_DIR/"
remote_cmd "
    docker login ghcr.io -u $REGISTRY_USER_NAME -p $REGISTRY_TOKEN && \
    cd $COMPOSE_FILE_DIR && \
    docker system prune -af && \
    export DB_USER=$DB_USER \
           DB_PASSWORD=$DB_PASSWORD \
           DB_DATABASE=$DB_DATABASE \
           NODE_ENV=production && \
    docker-compose -f $COMPOSE_FILE_NAME pull && \
    docker-compose -f $COMPOSE_FILE_NAME up -d
"
echo "Deployment completed successfully"
