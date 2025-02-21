#!/bin/bash
set -e

# Create the .ssh directory with appropriate permissions
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Disable StrictHostKeyChecking to prevent issues with the host key
echo -e "Host *\n\tStrictHostKeyChecking no\n\tUserKnownHostsFile /dev/null\n\n" > ~/.ssh/config

# Write the private key into the file and ensure proper permissions
echo "$SH_PRIVATE_KEY" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

# Debugging Step: Check the key file's content
echo "Private key content:"
cat ~/.ssh/id_rsa

# Start the SSH agent
eval "$(ssh-agent -s)"
echo "SSH Agent Started: $SSH_AGENT_PID"

# Add the private key to the SSH agent
ssh-add ~/.ssh/id_rsa

# Check the status of loaded keys in the agent
ssh-add -l

# Test SSH connection to the server
ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa root@$WEB_SERVER_SSH_HOST "echo 'SSH connection successful'"

