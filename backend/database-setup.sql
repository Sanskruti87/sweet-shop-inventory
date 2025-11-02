-- MySQL Database Setup Script for Sweet Shop Inventory Management System
-- Run this script to create the database, user, and initial setup

-- Create database
CREATE DATABASE IF NOT EXISTS sweetshop_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'sweetshop_user'@'localhost' IDENTIFIED BY 'sweetshop_password';
GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetshop_user'@'localhost';

-- Create user for remote access (optional)
CREATE USER IF NOT EXISTS 'sweetshop_user'@'%' IDENTIFIED BY 'sweetshop_password';
GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetshop_user'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

-- Use the database
USE sweetshop_db;

-- Create Categories table
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create Items table
CREATE TABLE IF NOT EXISTS items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id BIGINT NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    price DECIMAL(12,2) NOT NULL CHECK (price > 0),
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_items_category_id (category_id),
    INDEX idx_items_name (name),
    INDEX idx_items_stock (stock),
    INDEX idx_items_price (price),
    INDEX idx_items_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial data
INSERT INTO categories (id, name, description, created_at, updated_at) VALUES
(1, 'Dry Sweet', 'Dry sweets and fudges', NOW(), NOW()),
(2, 'Bengali Sweet', 'Traditional Bengali sweets', NOW(), NOW()),
(3, 'Traditional', 'Classic Indian sweets', NOW(), NOW()),
(4, 'Milk Sweet', 'Milk-based sweets', NOW(), NOW()),
(5, 'Syrup-based', 'Sweets in syrup', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
    description = VALUES(description),
    updated_at = NOW();

INSERT INTO items (id, name, category_id, stock, price, description, created_at, updated_at) VALUES
(1, 'Kaju Katli', 1, 20, 600.00, 'Delicious cashew fudge', NOW(), NOW()),
(2, 'Rasgulla', 2, 45, 350.00, 'Soft spongy balls in syrup', NOW(), NOW()),
(3, 'Laddu', 3, 8, 250.00, 'Round sweet balls', NOW(), NOW()),
(4, 'Gulab Jamun', 5, 35, 300.00, 'Fried milk solids in syrup', NOW(), NOW()),
(5, 'Barfi', 4, 15, 400.00, 'Milk-based fudge', NOW(), NOW()),
(6, 'Jalebi', 5, 5, 200.00, 'Spiral sweet in syrup', NOW(), NOW()),
(7, 'Kheer', 4, 12, 280.00, 'Rice pudding', NOW(), NOW()),
(8, 'Halwa', 3, 22, 350.00, 'Semolina pudding', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
    category_id = VALUES(category_id),
    stock = VALUES(stock),
    price = VALUES(price),
    description = VALUES(description),
    updated_at = NOW();

-- Reset auto-increment values
ALTER TABLE categories AUTO_INCREMENT = 6;
ALTER TABLE items AUTO_INCREMENT = 9;

-- Show created tables
SHOW TABLES;

-- Show sample data
SELECT 'Categories:' as info;
SELECT * FROM categories;

SELECT 'Items:' as info;
SELECT i.id, i.name, c.name as category, i.stock, i.price, i.description 
FROM items i 
JOIN categories c ON i.category_id = c.id 
ORDER BY i.id;
