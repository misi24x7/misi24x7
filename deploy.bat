@echo off
chcp 65001 >nul
echo 🚀 Deploying SmartOps Website...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker and try again.
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install it and try again.
    pause
    exit /b 1
)

REM Create logs directory if it doesn't exist
if not exist "logs" (
    echo [INFO] Creating logs directory...
    mkdir logs
)

REM Stop and remove existing containers
echo [INFO] Stopping existing containers...
docker-compose down --remove-orphans

REM Build the Docker image
echo [INFO] Building Docker image...
docker-compose build --no-cache
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build Docker image!
    pause
    exit /b 1
)
echo [INFO] Docker image built successfully!

REM Start the services
echo [INFO] Starting services...
docker-compose up -d
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start services!
    pause
    exit /b 1
)
echo [INFO] Services started successfully!

REM Wait a moment for services to be ready
echo [INFO] Waiting for services to be ready...
timeout /t 5 /nobreak >nul

REM Check if the service is running
docker-compose ps | findstr "Up" >nul
if %errorlevel% equ 0 (
    echo [INFO] ✅ SmartOps Website is now running!
    echo.
    echo 🌐 Website: http://localhost
    echo 🔍 Health Check: http://localhost/health
    echo 📊 Container Status: docker-compose ps
    echo 📝 View Logs: docker-compose logs -f
    echo 🛑 Stop Services: docker-compose down
    echo.
) else (
    echo [ERROR] Service failed to start properly!
    echo [INFO] Checking logs...
    docker-compose logs
    pause
    exit /b 1
)

echo [INFO] Deployment completed successfully! 🎉
pause
