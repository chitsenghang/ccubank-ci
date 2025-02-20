#!/bin/bash
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r ./docker-compose.development.yaml root@$WEB_SERVER_SSH_HOST:$COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME

ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@$WEB_SERVER_SSH_HOST << EOF
    export REGISTRY_USERNAME=$REGISTRY_USERNAME
    export REGISTRY_PASSWORD=$REGISTRY_PASSWORD
    docker system prune -af
    echo $REGISTRY_PASSWORD | docker login sjc.vultrcr.com -u $REGISTRY_USERNAME --password-stdin
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME pull
    docker compose -f $COMPOSE_FILE_DIR/$COMPOSE_FILE_NAME up -d
    sleep 5
    docker ps -a
EOF
