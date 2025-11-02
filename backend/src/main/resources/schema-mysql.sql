-- MySQL Database Schema for Sweet Shop Inventory Management System
-- This script creates the database tables for the Sweet Shop Inventory Management System

-- Create database (run this separately if needed)
-- CREATE DATABASE IF NOT EXISTS sweetshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE sweetshop_db;

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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_items_category_name ON items(category_id, name);
CREATE INDEX IF NOT EXISTS idx_items_stock_price ON items(stock, price);

-- Add constraints
ALTER TABLE items ADD CONSTRAINT chk_stock_positive CHECK (stock >= 0);
ALTER TABLE items ADD CONSTRAINT chk_price_positive CHECK (price > 0);
ALTER TABLE categories ADD CONSTRAINT chk_category_name_not_empty CHECK (CHAR_LENGTH(TRIM(name)) > 0);
ALTER TABLE items ADD CONSTRAINT chk_item_name_not_empty CHECK (CHAR_LENGTH(TRIM(name)) > 0);
ALTER TABLE items ADD CONSTRAINT chk_description_not_empty CHECK (CHAR_LENGTH(TRIM(description)) > 0);
