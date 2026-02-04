# === 1. Build stage ===
FROM node:20-alpine AS builder

WORKDIR /app

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the Next.js app (skip linting)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# === 2. Production stage ===
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Don't run as root
# User 'node' already exists in node:alpine images, so we just use it.
# If you want to use a specific UID/GID, you might need to modify the existing user or use a different name.
# RUN addgroup --system --gid 1001 node
# RUN adduser --system --uid 1001 node

# Copy public folder
COPY --from=builder /app/public ./public

# Copy standalone build
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
