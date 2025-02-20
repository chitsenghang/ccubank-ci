## Project setup

```bash
$ yarn
```

## Compile and run the project

```bash
# watch mode
$ yarn start:local

# production mode
$ yarn run start:prod

$ yarn migration:create [dir]

# setup database and redis for local development
$ docker-compose -f docker-compose-db.yml up -d

# build docker for specific env mode
$ NODE_ENV=[development] docker-compose -f docker-compose.development.yml up --build
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
