#!/bin/bash
set -x  # Enable debug mode

echo "Checking if /root/ccubank exists..."
ssh root@$WEB_SERVER_SSH_HOST "ls -la /root/ccubank"

echo "Copying files..."
scp -o StrictHostKeyChecking=no docker-compose.development.yaml root@$WEB_SERVER_SSH_HOST:/root/ccubank/

echo "Verifying copied files..."
ssh root@$WEB_SERVER_SSH_HOST "ls -la /root/ccubank"

set +x  # Disable debug mode
