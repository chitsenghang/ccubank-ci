#!/bin/bash
ENV_VARS=("PORT" "DB_HOST" "DB_PORT" "DB_USER" "DB_PASSWORD" "DB_DATABASE" "REDIS_HOST" "REDIS_PORT" "CACHE_TTL" "JWT_SECRET" "JWT_ACCESS_TOKEN_EXPIRE" "JWT_REFRESH_TOKEN_EXPIRE" "RATE_LIMIT" "RATE_LIMIT_TTL")

> .env

for var in "${ENV_VARS[@]}"; do
  echo "$var=${!var}" >> .env
done

echo "Created .env file with environment variables: ${ENV_VARS[@]}"

cat .env | grep -v 'DB_PASSWORD\|JWT_SECRET' | echo "Sanitized .env content"
