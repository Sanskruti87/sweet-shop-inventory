-- Database initialization script for Sweet Shop Inventory Management System
-- This script creates the initial categories and items based on the frontend mock data

-- Insert Categories
INSERT INTO categories (id, name, description, created_at, updated_at) VALUES
(1, 'Dry Sweet', 'Dry sweets and fudges', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Bengali Sweet', 'Traditional Bengali sweets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Traditional', 'Classic Indian sweets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Milk Sweet', 'Milk-based sweets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Syrup-based', 'Sweets in syrup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert Items
INSERT INTO items (id, name, category_id, stock, price, description, created_at, updated_at) VALUES
(1, 'Kaju Katli', 1, 20, 600.00, 'Delicious cashew fudge', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Rasgulla', 2, 45, 350.00, 'Soft spongy balls in syrup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Laddu', 3, 8, 250.00, 'Round sweet balls', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Gulab Jamun', 5, 35, 300.00, 'Fried milk solids in syrup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Barfi', 4, 15, 400.00, 'Milk-based fudge', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Jalebi', 5, 5, 200.00, 'Spiral sweet in syrup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Kheer', 4, 12, 280.00, 'Rice pudding', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Halwa', 3, 22, 350.00, 'Semolina pudding', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Reset sequence for auto-increment (H2 syntax)
ALTER TABLE categories ALTER COLUMN id RESTART WITH 6;
ALTER TABLE items ALTER COLUMN id RESTART WITH 9;
