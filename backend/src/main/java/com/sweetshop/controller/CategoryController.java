package com.sweetshop.controller;

import com.sweetshop.model.Category;
import com.sweetshop.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    // Get all categories
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    // Get category by ID
    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    // Get category by name
    @GetMapping("/categories/name/{name}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String name) {
        Optional<Category> category = categoryService.getCategoryByName(name);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new category
    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        try {
            Category category = new Category();
            category.setName(categoryRequest.getName());
            category.setDescription(categoryRequest.getDescription());
            
            Category createdCategory = categoryService.createCategory(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Update category
    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryRequest categoryRequest) {
        try {
            Category category = new Category();
            category.setName(categoryRequest.getName());
            category.setDescription(categoryRequest.getDescription());
            
            Category updatedCategory = categoryService.updateCategory(id, category);
            return ResponseEntity.ok(updatedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Delete category
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Cannot delete category with existing items")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get categories with items
    @GetMapping("/categories/with-items")
    public ResponseEntity<List<Category>> getCategoriesWithItems() {
        List<Category> categories = categoryService.getCategoriesWithItems();
        return ResponseEntity.ok(categories);
    }
    
    // Get category statistics
    @GetMapping("/categories/statistics")
    public ResponseEntity<List<CategoryService.CategoryStats>> getCategoryStatistics() {
        List<CategoryService.CategoryStats> stats = categoryService.getCategoryStatistics();
        return ResponseEntity.ok(stats);
    }
    
    // Search categories by name
    @GetMapping("/categories/search")
    public ResponseEntity<List<Category>> searchCategories(@RequestParam String name) {
        List<Category> categories = categoryService.searchCategoriesByName(name);
        return ResponseEntity.ok(categories);
    }
    
    // Get all category names
    @GetMapping("/categories/names")
    public ResponseEntity<List<String>> getAllCategoryNames() {
        List<String> names = categoryService.getAllCategoryNames();
        return ResponseEntity.ok(names);
    }
    
    // Inner class for request DTO
    public static class CategoryRequest {
        private String name;
        private String description;
        
        // Constructors
        public CategoryRequest() {}
        
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
