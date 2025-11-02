@echo off
REM MySQL Database Setup Script for Sweet Shop Inventory Management System
REM This script automates the database setup process

echo 🍬 Sweet Shop Inventory Management System - Database Setup
echo ==========================================================
echo.

REM Check if MySQL is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL is not installed. Please install MySQL 8.0+ first.
    echo    Visit: https://dev.mysql.com/downloads/mysql/
    pause
    exit /b 1
)

echo ✅ MySQL found
for /f "tokens=*" %%i in ('mysql --version') do echo    %%i
echo.

REM Get MySQL root password
set /p ROOT_PASSWORD="Enter MySQL root password: "

REM Test MySQL connection
echo Testing MySQL connection...
mysql -u root -p%ROOT_PASSWORD% -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Failed to connect to MySQL. Please check your root password.
    pause
    exit /b 1
)

echo ✅ MySQL connection successful
echo.

REM Run database setup
echo Creating database and user...
mysql -u root -p%ROOT_PASSWORD% < backend\database-setup.sql
if %errorlevel% equ 0 (
    echo ✅ Database setup completed successfully!
    echo.
    echo Database Details:
    echo   Database: sweetshop_db
    echo   Username: sweetshop_user
    echo   Password: sweetshop_password
    echo   Host: localhost
    echo   Port: 3306
    echo.
    echo Next steps:
    echo 1. Start the backend: cd backend ^&^& mvn spring-boot:run
    echo 2. Start the frontend: pnpm dev
    echo 3. Access the application at: http://localhost:3000
    echo.
    echo 🎉 Setup complete! Your sweet shop inventory system is ready!
) else (
    echo ❌ Database setup failed. Please check the error messages above.
)

pause
