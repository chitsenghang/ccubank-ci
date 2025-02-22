#!/usr/bin/env bash

REMOTE_HOST="207.148.76.131"
REMOTE_USER="root"

ssh ${REMOTE_USER}@${REMOTE_HOST} << EOF
  # Commands to be executed on the remote server
  echo "Connected successfully!"
  hostnamectl
  uptime
EOF

echo "SSH session ended."
