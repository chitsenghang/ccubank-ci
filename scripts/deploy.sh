#!/bin/bash
set -x  # Enable debug mode

echo "Checking if ./ccubank exists..."
ssh root@$WEB_SERVER_SSH_HOST "ls -la ./ccubank"

echo "Copying files..."
scp -o StrictHostKeyChecking=no docker-compose.development.yaml root@$WEB_SERVER_SSH_HOST:/ccubank/

echo "Verifying copied files..."
ssh root@$WEB_SERVER_SSH_HOST "ls -la ./ccubank"

set +x  # Disable debug mode
