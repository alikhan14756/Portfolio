FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# Copy workspace configurations
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/common/package.json ./packages/common/
COPY packages/server/package.json ./packages/server/

# Install dependencies
RUN pnpm install --frozen-lockfile --filter @aetheria/common... --filter @aetheria/server...

# Copy source files
COPY packages/common ./packages/common
COPY packages/server ./packages/server

# Build packages
RUN pnpm --filter @aetheria/common build
RUN pnpm --filter @aetheria/server build

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

CMD ["node", "packages/server/dist/server.js"]
