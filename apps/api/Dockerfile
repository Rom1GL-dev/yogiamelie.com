# -----------------------------
# Base
# -----------------------------
FROM node:22-alpine AS base
RUN apk add --no-cache bash git curl openssl libc6-compat
WORKDIR /app

# -----------------------------
# Builder
# -----------------------------
FROM base AS builder
ARG YARN_VERSION=4.7.0
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_NAME

RUN corepack enable && corepack prepare yarn@$YARN_VERSION
RUN yarn global add turbo

COPY package.json yarn.lock ./
COPY apps/api/package.json apps/api/
COPY packages/ packages/

RUN yarn install --frozen-lockfile

COPY apps/api/ apps/api/

ENV DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@database:5432/${DATABASE_NAME}?schema=public"

RUN yarn turbo prune api @yogiamelie/database @yogiamelie/typescript-config --docker

# -----------------------------
# Installer
# -----------------------------
FROM base AS installer
ARG YARN_VERSION=4.7.0
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_NAME

WORKDIR /app

RUN corepack enable && corepack prepare yarn@$YARN_VERSION

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ENV DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@database:5432/${DATABASE_NAME}?schema=public"

RUN yarn turbo run build --filter=api...

# -----------------------------
# Production
# -----------------------------
FROM base AS production
ARG YARN_VERSION=4.7.0

WORKDIR /app

RUN corepack enable && corepack prepare yarn@$YARN_VERSION

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser

COPY --from=installer --chown=apiuser:nodejs /app .

COPY apps/api/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3001

USER apiuser

CMD ["/app/entrypoint.sh"]
