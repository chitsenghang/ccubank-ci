#!/bin/bash
set -x  # Enable debug mode

echo "Checking if ./ccubank exists..."
ssh $WEB_SERVER_SSH_HOST "ls -la ./ccubank"

echo "Copying files..."
scp -o StrictHostKeyChecking=no docker-compose.development.yaml $WEB_SERVER_SSH_HOST:/ccubank/

echo "Verifying copied files..."
ssh $WEB_SERVER_SSH_HOST "ls -la ./ccubank"

set +x
