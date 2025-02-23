#!/bin/bash
set -eu

setup_ssh() {
    # Create and set SSH directory permissions
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh

    # Create and secure the deploy key
    echo "$SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' > ~/.ssh/deploy_key
    chmod 600 ~/.ssh/deploy_key

    # Add host to known hosts
    ssh-keyscan -p "${SSH_PORT:-22}" -H "$SERVER_HOST" >> ~/.ssh/known_hosts
    chmod 644 ~/.ssh/known_hosts
}
