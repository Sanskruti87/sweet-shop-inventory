package com.sweetshop.service;

import com.sweetshop.model.Category;
import com.sweetshop.repository.CategoryRepository;
import com.sweetshop.repository.ItemRepository;
import com.sweetshop.exception.ResourceNotFoundException;
import com.sweetshop.exception.ResourceAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private ItemRepository itemRepository;
    
    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    // Get category by ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    // Get category by name
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByNameIgnoreCase(name);
    }
    
    // Create new category
    public Category createCategory(Category category) {
        if (categoryRepository.existsByNameIgnoreCase(category.getName())) {
            throw new ResourceAlreadyExistsException("Category", category.getName());
        }
        return categoryRepository.save(category);
    }
    
    // Update category
    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        return categoryRepository.save(category);
    }
    
    // Delete category
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));
        
        // Check if category has items
        if (!category.getItems().isEmpty()) {
            throw new RuntimeException("Cannot delete category with existing items. Please move or delete items first.");
        }
        categoryRepository.deleteById(id);
    }
    
    // Get categories with items
    public List<Category> getCategoriesWithItems() {
        return categoryRepository.findCategoriesWithItems();
    }
    
    // Get category statistics
    public List<CategoryStats> getCategoryStatistics() {
        List<Object[]> results = categoryRepository.getCategoryStatistics();
        return results.stream()
                .map(result -> new CategoryStats(
                    (String) result[0],
                    ((Number) result[1]).longValue(),
                    ((Number) result[2]).longValue(),
                    (java.math.BigDecimal) result[3]
                ))
                .toList();
    }
    
    // Search categories by name
    public List<Category> searchCategoriesByName(String name) {
        return categoryRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get all category names
    public List<String> getAllCategoryNames() {
        return categoryRepository.findAllCategoryNames();
    }
    
    // Inner class for category statistics
    public static class CategoryStats {
        private final String categoryName;
        private final Long itemCount;
        private final Long totalStock;
        private final java.math.BigDecimal totalValue;
        
        public CategoryStats(String categoryName, Long itemCount, Long totalStock, java.math.BigDecimal totalValue) {
            this.categoryName = categoryName;
            this.itemCount = itemCount;
            this.totalStock = totalStock;
            this.totalValue = totalValue;
        }
        
        public String getCategoryName() { return categoryName; }
        public Long getItemCount() { return itemCount; }
        public Long getTotalStock() { return totalStock; }
        public java.math.BigDecimal getTotalValue() { return totalValue; }
    }
}
