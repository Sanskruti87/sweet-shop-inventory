-- MySQL Data Initialization Script for Sweet Shop Inventory Management System
-- This script populates the database with initial categories and items based on the frontend mock data

-- Insert Categories
INSERT INTO categories (id, name, description, created_at, updated_at) VALUES
(1, 'Dry Sweet', 'Dry sweets and fudges', NOW(), NOW()),
(2, 'Bengali Sweet', 'Traditional Bengali sweets', NOW(), NOW()),
(3, 'Traditional', 'Classic Indian sweets', NOW(), NOW()),
(4, 'Milk Sweet', 'Milk-based sweets', NOW(), NOW()),
(5, 'Syrup-based', 'Sweets in syrup', NOW(), NOW())
ON DUPLICATE KEY UPDATE 
    description = VALUES(description),
    updated_at = NOW();

-- Insert Items
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
