# Sweet Shop Inventory Management System - Backend

A Spring Boot REST API backend for the Sweet Shop Inventory Management System. This backend provides comprehensive APIs for managing sweet items and categories.

## Features

- **Item Management**: CRUD operations for sweet items
- **Category Management**: CRUD operations for categories
- **Search & Filtering**: Advanced search capabilities with multiple criteria
- **Dashboard Statistics**: Real-time inventory statistics
- **Data Validation**: Comprehensive input validation
- **Exception Handling**: Global exception handling with proper HTTP status codes
- **CORS Support**: Cross-origin resource sharing enabled for frontend integration

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database** (In-memory for development)
- **Maven** (Build tool)
- **Jakarta Validation**

## API Endpoints

### Items API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items with optional filtering |
| GET | `/api/items/{id}` | Get item by ID |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/{id}` | Update item |
| DELETE | `/api/items/{id}` | Delete item |
| GET | `/api/items/low-stock` | Get low stock items |
| GET | `/api/dashboard/stats` | Get dashboard statistics |

### Categories API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/{id}` | Get category by ID |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |
| GET | `/api/categories/with-items` | Get categories with items |
| GET | `/api/categories/statistics` | Get category statistics |

## Request/Response Examples

### Create Item Request
```json
{
  "name": "Kaju Katli",
  "category": "Dry Sweet",
  "stock": 20,
  "price": 600.00,
  "description": "Delicious cashew fudge"
}
```

### Item Response
```json
{
  "id": 1,
  "name": "Kaju Katli",
  "category": {
    "id": 1,
    "name": "Dry Sweet",
    "description": "Dry sweets and fudges"
  },
  "stock": 20,
  "price": 600.00,
  "description": "Delicious cashew fudge",
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

### Dashboard Statistics Response
```json
{
  "totalItems": 8,
  "totalStock": 162,
  "totalValue": 2535.00,
  "lowStockItems": 2
}
```

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Running the Application

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Build the application**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**
   - API Base URL: `http://localhost:8080/api`
   - H2 Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:sweetshopdb`
     - Username: `sa`
     - Password: `password`

### Database

The application uses H2 in-memory database for development. The database is automatically initialized with sample data from the frontend mock data.

**Sample Data Includes:**
- 5 Categories: Dry Sweet, Bengali Sweet, Traditional, Milk Sweet, Syrup-based
- 8 Items: Kaju Katli, Rasgulla, Laddu, Gulab Jamun, Barfi, Jalebi, Kheer, Halwa

## Configuration

### Application Properties
- **Server Port**: 8080
- **Database**: H2 In-memory
- **CORS**: Enabled for all origins
- **Logging**: Debug level for development

### CORS Configuration
The application is configured to accept requests from any origin (`*`) for development purposes. In production, you should restrict this to your frontend domain.

## Error Handling

The application provides comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request**: Validation errors
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource already exists
- **500 Internal Server Error**: Unexpected errors

### Error Response Format
```json
{
  "status": 404,
  "message": "Item not found with id: 999",
  "timestamp": "2024-01-01T10:00:00",
  "path": "/api/items/999"
}
```

## Development

### Project Structure
```
src/main/java/com/sweetshop/
├── SweetShopBackendApplication.java    # Main application class
├── config/
│   └── WebConfig.java                  # CORS configuration
├── controller/
│   ├── ItemController.java             # Item REST endpoints
│   └── CategoryController.java         # Category REST endpoints
├── exception/
│   ├── GlobalExceptionHandler.java     # Global exception handling
│   ├── ResourceNotFoundException.java
│   ├── ResourceAlreadyExistsException.java
│   └── ValidationException.java
├── model/
│   ├── Item.java                       # Item entity
│   └── Category.java                    # Category entity
├── repository/
│   ├── ItemRepository.java              # Item data access
│   └── CategoryRepository.java          # Category data access
└── service/
    ├── ItemService.java                 # Item business logic
    └── CategoryService.java             # Category business logic
```

### Adding New Features

1. **Create Entity**: Add new model classes in `model/` package
2. **Create Repository**: Add repository interfaces in `repository/` package
3. **Create Service**: Add service classes in `service/` package
4. **Create Controller**: Add REST controllers in `controller/` package
5. **Add Tests**: Create unit and integration tests

## Testing

Run tests using Maven:
```bash
mvn test
```

## Production Deployment

For production deployment:

1. **Database**: Replace H2 with PostgreSQL/MySQL
2. **Security**: Add authentication and authorization
3. **CORS**: Restrict to specific domains
4. **Logging**: Configure appropriate log levels
5. **Monitoring**: Add health checks and metrics

## API Documentation

The API follows RESTful conventions and returns JSON responses. All endpoints support JSON content type.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
