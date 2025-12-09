#########################################
# Stage 1 — Build Stage
#########################################
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Required tools for compiling modules (if any)
RUN apk add --no-cache bash build-base python3 netcat-openbsd

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

# Install ALL dependencies as root (avoids permission issues)
RUN npm ci

# Copy source
COPY . .
COPY scripts ./scripts
RUN chmod +x ./scripts/wait-for-db.sh

# Build TypeScript → dist/
RUN npm run build


#########################################
# Stage 2 — Runtime Stage
#########################################
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy necessary files from builder (with correct ownership)
COPY --from=builder --chown=appuser:appgroup /usr/src/app/package.json ./package.json
COPY --from=builder --chown=appuser:appgroup /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /usr/src/app/dist ./dist

USER appuser

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/index.js"]
