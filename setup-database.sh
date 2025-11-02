#!/bin/bash

# MySQL Database Setup Script for Sweet Shop Inventory Management System
# This script automates the database setup process

echo "🍬 Sweet Shop Inventory Management System - Database Setup"
echo "=========================================================="
echo ""

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 8.0+ first."
    echo "   Visit: https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

echo "✅ MySQL found: $(mysql --version)"
echo ""

# Get MySQL root password
echo "Enter MySQL root password:"
read -s ROOT_PASSWORD

# Test MySQL connection
echo "Testing MySQL connection..."
if ! mysql -u root -p$ROOT_PASSWORD -e "SELECT 1;" &> /dev/null; then
    echo "❌ Failed to connect to MySQL. Please check your root password."
    exit 1
fi

echo "✅ MySQL connection successful"
echo ""

# Run database setup
echo "Creating database and user..."
if mysql -u root -p$ROOT_PASSWORD < database-setup.sql; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "Database Details:"
    echo "  Database: sweetshop_db"
    echo "  Username: sweetshop_user"
    echo "  Password: sweetshop_password"
    echo "  Host: localhost"
    echo "  Port: 3306"
    echo ""
    echo "Next steps:"
    echo "1. Start the backend: cd backend && mvn spring-boot:run"
    echo "2. Start the frontend: pnpm dev"
    echo "3. Access the application at: http://localhost:3000"
    echo ""
    echo "🎉 Setup complete! Your sweet shop inventory system is ready!"
else
    echo "❌ Database setup failed. Please check the error messages above."
    exit 1
fi
