#!/bin/bash

# Development Docker script with hot reload
echo "🚀 Starting Next.js development server with hot reload in Docker..."

# Build and run development container
docker-compose -f docker-compose.dev.yml up --build

# Alternative: Use the main docker-compose.yml for development
# docker-compose up app-dev --build
