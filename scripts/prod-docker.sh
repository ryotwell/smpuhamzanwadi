#!/bin/bash

# Production Docker script
echo "🏗️ Building and starting Next.js production server in Docker..."

# Build and run production container
docker-compose --profile production up --build

# Alternative: Direct docker build and run
# docker build -t smpuhamzanwadi-prod .
# docker run -p 3000:3000 smpuhamzanwadi-prod
