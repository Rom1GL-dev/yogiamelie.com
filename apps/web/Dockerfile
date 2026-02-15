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

RUN corepack enable && corepack prepare yarn@$YARN_VERSION
RUN yarn global add turbo

COPY package.json yarn.lock ./
COPY apps/web/package.json apps/web/
COPY packages/ packages/

RUN yarn install --frozen-lockfile

COPY apps/web/ apps/web/
COPY turbo.json turbo.json

RUN yarn turbo prune web --docker

# -----------------------------
# Installer
# -----------------------------
FROM base AS installer
ARG YARN_VERSION=4.7.0

WORKDIR /app

RUN corepack enable && corepack prepare yarn@$YARN_VERSION

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/yarn.lock ./yarn.lock

RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn turbo run build --filter=web

# -----------------------------
# Production
# -----------------------------
FROM base AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=installer /app/apps/web/public ./apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
