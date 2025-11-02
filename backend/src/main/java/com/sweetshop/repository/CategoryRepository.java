package com.sweetshop.repository;

import com.sweetshop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    // Find category by name (case-insensitive)
    Optional<Category> findByNameIgnoreCase(String name);
    
    // Check if category exists by name
    boolean existsByNameIgnoreCase(String name);
    
    // Find categories with items
    @Query("SELECT DISTINCT c FROM Category c JOIN c.items i")
    List<Category> findCategoriesWithItems();
    
    // Get category statistics
    @Query("SELECT c.name, COUNT(i) as itemCount, SUM(i.stock) as totalStock, SUM(i.stock * i.price) as totalValue " +
           "FROM Category c LEFT JOIN c.items i GROUP BY c.id, c.name")
    List<Object[]> getCategoryStatistics();
    
    // Find categories by name containing (case-insensitive)
    @Query("SELECT c FROM Category c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Category> findByNameContainingIgnoreCase(@Param("name") String name);
    
    // Get all category names
    @Query("SELECT c.name FROM Category c ORDER BY c.name")
    List<String> findAllCategoryNames();
}
