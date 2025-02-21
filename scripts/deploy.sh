#!/bin/bash
set -x  # Enable debug mode

echo "Checking if /root/ccubank exists..."
ssh root@hang "ls -la /root/ccubank"

echo "Copying files..."
scp -o StrictHostKeyChecking=no docker-compose.development.yaml root@hang:/root/ccubank/

echo "Verifying copied files..."
ssh root@hang "ls -la /root/ccubank"

set +x  # Disable debug mode
