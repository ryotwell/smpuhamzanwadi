# Docker Development Setup

This project supports both development and production Docker configurations with hot reload functionality.

## Quick Start

### Prerequisites
1. Copy `.env.example` to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

2. Make sure Docker and Docker Compose are installed on your system.

### Development with Hot Reload

```bash
# Option 1: Using npm scripts
npm run docker:dev

# Option 2: Using docker-compose directly
docker-compose -f docker-compose.dev.yml up --build

# Option 3: Using the development script
./scripts/dev-docker.sh
```

### Production Build

```bash
# Option 1: Using npm scripts
npm run docker:prod

# Option 2: Using docker-compose directly
docker-compose --profile production up --build

# Option 3: Using the production script
./scripts/prod-docker.sh
```

## Development Features

- **Hot Reload**: Changes to your source code are automatically reflected in the browser
- **Volume Mounting**: Source code is mounted as a volume for instant updates
- **Node Modules**: Uses container's node_modules for consistency
- **Prisma Support**: Automatically generates Prisma client on container start

## File Structure

```
├── Dockerfile              # Production Dockerfile
├── Dockerfile.dev          # Development Dockerfile with hot reload
├── docker-compose.yml      # Main compose file (dev + prod profiles)
├── docker-compose.dev.yml  # Development-only compose file
├── .dockerignore           # Files to exclude from Docker context
└── scripts/
    ├── dev-docker.sh       # Development startup script
    └── prod-docker.sh      # Production startup script
```

## Available Commands

### Development Commands
- `npm run docker:dev` - Start development server with hot reload
- `npm run docker:dev:clean` - Clean build and start development server

### Production Commands
- `npm run docker:prod` - Start production server
- `npm run docker:prod:clean` - Clean build and start production server

### Manual Docker Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose --profile production up --build

# Stop containers
docker-compose down

# Clean everything (containers, volumes, networks)
docker-compose down -v --remove-orphans
```

## Ports

- **Development**: http://localhost:3000
- **Production**: http://localhost:3001

## Environment Variables

The development setup includes:
- `NODE_ENV=development`
- `NEXT_TELEMETRY_DISABLED=1`

## Troubleshooting

### Prisma Schema Not Found
If you get "Could not find Prisma Schema" error:
1. Ensure `prisma/schema.prisma` exists in your project
2. Check that the file is not excluded in `.dockerignore`
3. The Dockerfile now handles this by installing dependencies first, then copying source code

### Hot Reload Not Working
1. Ensure volumes are properly mounted
2. Check that the container has access to your source files
3. Verify that the development server is running with `--watch` flag

### Build Issues
1. Clean Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`
3. Check `.dockerignore` to ensure necessary files are included
4. For Prisma issues, try: `docker-compose down -v && docker-compose up --build`

### Port Conflicts
If port 3000 is already in use:
```bash
# Change port in docker-compose.dev.yml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Environment Variables
Make sure you have a `.env` file with required variables:
```bash
# Copy the example file
cp .env.example .env

# Edit with your values
DATABASE_URL="file:./dev.db"
```

## Development Workflow

1. Start development container: `npm run docker:dev`
2. Make changes to your source code
3. Changes are automatically reflected in the browser
4. Use `Ctrl+C` to stop the development server
5. Use `docker-compose down` to stop and remove containers

## Production Deployment

The production setup uses:
- Multi-stage build for optimization
- Standalone output for smaller image size
- Non-root user for security
- Optimized layer caching
