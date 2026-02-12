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
COPY apps/dashboard/package.json apps/dashboard/
COPY packages/ packages/

RUN yarn install --frozen-lockfile

COPY apps/dashboard/ apps/dashboard/
COPY turbo.json turbo.json

RUN yarn turbo prune dashboard --docker

# -----------------------------
# Installer
# -----------------------------
FROM base AS installer
ARG YARN_VERSION=4.7.0

WORKDIR /app

RUN corepack enable && corepack prepare yarn@$YARN_VERSION

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN yarn turbo run build --filter=dashboard

# -----------------------------
# Production (nginx)
# -----------------------------
FROM nginx:alpine AS production

COPY --from=installer /app/apps/dashboard/dist /usr/share/nginx/html

# SPA routing: redirect all routes to index.html
RUN printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
\n\
  location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {\n\
    expires 1y;\n\
    add_header Cache-Control "public, immutable";\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
