@echo off
echo Starting Sweet Shop Backend...
echo.
echo Make sure you have Java 17+ and Maven installed
echo.
echo Backend will be available at: http://localhost:8080
echo H2 Console will be available at: http://localhost:8080/h2-console
echo.
echo Press Ctrl+C to stop the server
echo.
cd backend
mvn spring-boot:run
