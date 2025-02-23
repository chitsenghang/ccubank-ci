FROM node:20-alpine AS builder

WORKDIR /app

RUN --mount=type=cache,target=/root/.cache \
    apk add --no-cache python3 g++ make git build-base

COPY package.json yarn.lock ./

RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install \
    --prefer-offline \
    --non-interactive \
    --frozen-lockfile \
    --production=false

COPY . .

RUN yarn build

RUN --mount=type=cache,target=/root/.cache/yarn \
    rm -rf node_modules && \
    NODE_ENV=production yarn install \
    --prefer-offline \
    --pure-lockfile \
    --non-interactive \
    --production=true

RUN rm -rf /root/.cache/yarn

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/yarn.lock /app/

ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 8000

CMD ["yarn", "start:prod"]
