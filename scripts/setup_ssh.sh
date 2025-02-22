#!/usr/bin/env bash

REMOTE_HOST="207.148.76.131"
REMOTE_USER="root"

# Using -t for interactive commands or sudo operations
ssh -t ${REMOTE_USER}@${REMOTE_HOST} << EOF
echo "Connected successfully!"
hostnamectl
uptime
EOF

# Or using no pseudo-TTY (-T) for non-interactive commands:
ssh -T ${REMOTE_USER}@${REMOTE_HOST} "ls /home"
