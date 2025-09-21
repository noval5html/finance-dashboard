FROM node:18-alpine

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy file config utama
COPY package.json pnpm-lock.yaml* ./

# Install dependencies + devDependencies
RUN pnpm install --frozen-lockfile --dev

# Copy seluruh source code
COPY . .

# Expose port aplikasi
EXPOSE 3000

# Jalankan app
CMD ["pnpm", "run", "dev"]
