package com.sweetshop.repository;

import com.sweetshop.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    
    // Find items by category name
    @Query("SELECT i FROM Item i JOIN i.category c WHERE c.name = :categoryName")
    List<Item> findByCategoryName(@Param("categoryName") String categoryName);
    
    // Find items by category name with pagination
    @Query("SELECT i FROM Item i JOIN i.category c WHERE c.name = :categoryName")
    Page<Item> findByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);
    
    // Search items by name (case-insensitive)
    @Query("SELECT i FROM Item i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Item> findByNameContainingIgnoreCase(@Param("name") String name);
    
    // Search items by name with pagination
    @Query("SELECT i FROM Item i WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Item> findByNameContainingIgnoreCase(@Param("name") String name, Pageable pageable);
    
    // Find items with low stock (below threshold)
    @Query("SELECT i FROM Item i WHERE i.stock < :threshold")
    List<Item> findLowStockItems(@Param("threshold") Integer threshold);
    
    // Find items by price range
    @Query("SELECT i FROM Item i WHERE i.price BETWEEN :minPrice AND :maxPrice")
    List<Item> findByPriceRange(@Param("minPrice") BigDecimal minPrice, @Param("maxPrice") BigDecimal maxPrice);
    
    // Find items by stock range
    @Query("SELECT i FROM Item i WHERE i.stock BETWEEN :minStock AND :maxStock")
    List<Item> findByStockRange(@Param("minStock") Integer minStock, @Param("maxStock") Integer maxStock);
    
    // Complex search with multiple criteria
    @Query("SELECT i FROM Item i WHERE " +
           "(:name IS NULL OR LOWER(i.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryName IS NULL OR i.category.name = :categoryName) AND " +
           "(:minPrice IS NULL OR i.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR i.price <= :maxPrice) AND " +
           "(:minStock IS NULL OR i.stock >= :minStock) AND " +
           "(:maxStock IS NULL OR i.stock <= :maxStock)")
    List<Item> findByMultipleCriteria(@Param("name") String name,
                                     @Param("categoryName") String categoryName,
                                     @Param("minPrice") BigDecimal minPrice,
                                     @Param("maxPrice") BigDecimal maxPrice,
                                     @Param("minStock") Integer minStock,
                                     @Param("maxStock") Integer maxStock);
    
    // Get total count of items
    @Query("SELECT COUNT(i) FROM Item i")
    Long getTotalItemCount();
    
    // Get total stock value
    @Query("SELECT SUM(i.stock * i.price) FROM Item i")
    BigDecimal getTotalStockValue();
    
    // Get total stock quantity
    @Query("SELECT SUM(i.stock) FROM Item i")
    Long getTotalStockQuantity();
    
    // Check if item exists by name
    boolean existsByName(String name);
    
    // Find item by name (exact match)
    Optional<Item> findByName(String name);
}
