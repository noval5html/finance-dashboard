FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

# Install semua dependencies + concurrently
RUN pnpm install --no-frozen-lockfile --dev \
    && pnpm add -D concurrently

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
