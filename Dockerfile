# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install additional compatibility tools (if required by Next.js or Node.js)
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy installed dependencies from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files to the container
COPY . .

# Disable telemetry during the build process
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app
RUN npm run build

# Create the production image
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Add a non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy required files for running the app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Change ownership of the files to the non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set the default port for the application
ENV PORT=3000

# Start the application using the server.js generated during build
CMD ["node", "server.js"]