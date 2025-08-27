#!/bin/bash

# SmartOps Website Docker Deployment Script
echo "🚀 Deploying SmartOps Website..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install it and try again."
    exit 1
fi

# Create logs directory if it doesn't exist
if [ ! -d "logs" ]; then
    print_status "Creating logs directory..."
    mkdir -p logs
fi

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose down --remove-orphans

# Build the Docker image
print_status "Building Docker image..."
if docker-compose build --no-cache; then
    print_status "Docker image built successfully!"
else
    print_error "Failed to build Docker image!"
    exit 1
fi

# Start the services
print_status "Starting services..."
if docker-compose up -d; then
    print_status "Services started successfully!"
else
    print_error "Failed to start services!"
    exit 1
fi

# Wait a moment for services to be ready
print_status "Waiting for services to be ready..."
sleep 5

# Check if the service is running
if docker-compose ps | grep -q "Up"; then
    print_status "✅ SmartOps Website is now running!"
    echo ""
    echo "🌐 Website: http://localhost"
    echo "🔍 Health Check: http://localhost/health"
    echo "📊 Container Status: docker-compose ps"
    echo "📝 View Logs: docker-compose logs -f"
    echo "🛑 Stop Services: docker-compose down"
    echo ""
else
    print_error "Service failed to start properly!"
    print_status "Checking logs..."
    docker-compose logs
    exit 1
fi

print_status "Deployment completed successfully! 🎉"
