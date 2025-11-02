# MySQL Database Setup for Sweet Shop Inventory Management System

This guide will help you set up MySQL database for the Sweet Shop Inventory Management System.

## 📋 Prerequisites

- **MySQL Server** 8.0 or higher
- **MySQL Workbench** (optional, for GUI management)
- **Java 17+** and **Maven** (for running the backend)

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

1. **Run the complete setup script:**
   ```bash
   mysql -u root -p < backend/database-setup.sql
   ```

2. **Start the backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Option 2: Manual Setup

#### Step 1: Create Database and User

```sql
-- Connect to MySQL as root
mysql -u root -p

-- Create database
CREATE DATABASE sweetshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'sweetshop_user'@'localhost' IDENTIFIED BY 'sweetshop_password';
GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetshop_user'@'localhost';

-- For remote access (optional)
CREATE USER 'sweetshop_user'@'%' IDENTIFIED BY 'sweetshop_password';
GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetshop_user'@'%';

FLUSH PRIVILEGES;
```

#### Step 2: Create Tables

```bash
# Run schema creation
mysql -u sweetshop_user -p sweetshop_db < backend/src/main/resources/schema-mysql.sql
```

#### Step 3: Insert Sample Data

```bash
# Run data initialization
mysql -u sweetshop_user -p sweetshop_db < backend/src/main/resources/data-mysql.sql
```

## 🔧 Configuration

### Database Connection Details

- **Host:** localhost
- **Port:** 3306
- **Database:** sweetshop_db
- **Username:** sweetshop_user
- **Password:** sweetshop_password

### Application Properties

The backend is configured to use MySQL with the following settings:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/sweetshop_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=sweetshop_user
spring.datasource.password=sweetshop_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=validate
```

## 📊 Database Schema

### Categories Table
```sql
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Items Table
```sql
CREATE TABLE items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id BIGINT NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    price DECIMAL(12,2) NOT NULL CHECK (price > 0),
    description VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
```

## 📝 Sample Data

The database comes pre-loaded with sample data:

### Categories
- Dry Sweet
- Bengali Sweet
- Traditional
- Milk Sweet
- Syrup-based

### Items
- Kaju Katli (Dry Sweet) - ₹600/kg
- Rasgulla (Bengali Sweet) - ₹350/kg
- Laddu (Traditional) - ₹250/kg
- Gulab Jamun (Syrup-based) - ₹300/kg
- Barfi (Milk Sweet) - ₹400/kg
- Jalebi (Syrup-based) - ₹200/kg
- Kheer (Milk Sweet) - ₹280/kg
- Halwa (Traditional) - ₹350/kg

## 🔍 Verification

### Check Database Connection
```bash
mysql -u sweetshop_user -p sweetshop_db -e "SHOW TABLES;"
```

### Verify Sample Data
```sql
-- Check categories
SELECT * FROM categories;

-- Check items with category names
SELECT i.id, i.name, c.name as category, i.stock, i.price 
FROM items i 
JOIN categories c ON i.category_id = c.id 
ORDER BY i.id;
```

### Test Backend Connection
```bash
# Start the backend
cd backend
mvn spring-boot:run

# Test API endpoint
curl http://localhost:8080/api/items
```

## 🛠️ Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure MySQL server is running
   - Check if port 3306 is accessible
   - Verify username and password

2. **Access Denied**
   - Check user privileges
   - Ensure user has access to sweetshop_db
   - Run: `GRANT ALL PRIVILEGES ON sweetshop_db.* TO 'sweetshop_user'@'localhost';`

3. **Character Set Issues**
   - Ensure database uses utf8mb4 charset
   - Check table collation settings

4. **Foreign Key Constraints**
   - Ensure categories are inserted before items
   - Check foreign key relationships

### Useful Commands

```sql
-- Check database status
SHOW DATABASES;
USE sweetshop_db;
SHOW TABLES;

-- Check user privileges
SHOW GRANTS FOR 'sweetshop_user'@'localhost';

-- Check table structure
DESCRIBE categories;
DESCRIBE items;

-- Check foreign key constraints
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_SCHEMA = 'sweetshop_db';
```

## 🔒 Security Considerations

### Production Setup

1. **Change Default Passwords**
   ```sql
   ALTER USER 'sweetshop_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   ```

2. **Restrict User Privileges**
   ```sql
   -- Remove unnecessary privileges
   REVOKE ALL PRIVILEGES ON *.* FROM 'sweetshop_user'@'localhost';
   GRANT SELECT, INSERT, UPDATE, DELETE ON sweetshop_db.* TO 'sweetshop_user'@'localhost';
   ```

3. **Enable SSL**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/sweetshop_db?useSSL=true&serverTimezone=UTC
   ```

4. **Use Environment Variables**
   ```properties
   spring.datasource.username=${DB_USERNAME}
   spring.datasource.password=${DB_PASSWORD}
   ```

## 📈 Performance Optimization

### Indexes
The database includes optimized indexes:
- Primary keys on all tables
- Foreign key indexes
- Search indexes on name fields
- Performance indexes on stock and price

### Connection Pooling
Configured with HikariCP:
- Maximum pool size: 20
- Minimum idle: 5
- Connection timeout: 20 seconds

## 🔄 Backup and Restore

### Backup Database
```bash
mysqldump -u sweetshop_user -p sweetshop_db > sweetshop_backup.sql
```

### Restore Database
```bash
mysql -u sweetshop_user -p sweetshop_db < sweetshop_backup.sql
```

## 📞 Support

If you encounter issues:
1. Check MySQL server logs
2. Verify connection parameters
3. Test database connectivity
4. Check application logs for detailed error messages

## 🔮 Future Enhancements

- Database replication for high availability
- Automated backup scheduling
- Performance monitoring
- Database migration scripts
- Multi-tenant support
