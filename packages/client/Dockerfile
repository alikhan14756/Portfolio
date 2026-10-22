FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# Copy workspace configs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/common/package.json ./packages/common/
COPY packages/client/package.json ./packages/client/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/common ./packages/common
COPY packages/client ./packages/client

# Build packages
RUN pnpm --filter @aetheria/common build
RUN pnpm --filter @aetheria/client build

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["pnpm", "--filter", "@aetheria/client", "start"]
