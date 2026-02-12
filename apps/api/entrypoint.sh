#!/bin/bash
set -e

echo "Applying database schema..."
cd /app
npx prisma db push --schema=packages/database/prisma/schema.prisma --accept-data-loss

echo "Running database seed..."
npx tsx packages/database/src/seed.ts

echo "Starting API server..."
exec node apps/api/dist/main.js
