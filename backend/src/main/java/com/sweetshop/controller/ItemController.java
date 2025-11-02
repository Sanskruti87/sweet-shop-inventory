package com.sweetshop.controller;

import com.sweetshop.model.Item;
import com.sweetshop.model.Category;
import com.sweetshop.service.ItemService;
import com.sweetshop.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ItemController {
    
    @Autowired
    private ItemService itemService;
    
    @Autowired
    private CategoryService categoryService;
    
    // Get all items
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer minStock,
            @RequestParam(required = false) Integer maxStock,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        
        try {
            List<Item> items;
            
            // If search parameters are provided, use complex search
            if (search != null || category != null || minPrice != null || maxPrice != null || 
                minStock != null || maxStock != null) {
                items = itemService.searchItems(search, category, minPrice, maxPrice, minStock, maxStock);
            } else {
                // Otherwise get all items
                items = itemService.getAllItems();
            }
            
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get item by ID
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    // Create new item
    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@Valid @RequestBody ItemRequest itemRequest) {
        try {
            // Find or create category
            Category category = categoryService.getCategoryByName(itemRequest.getCategory())
                    .orElseGet(() -> categoryService.createCategory(new Category(itemRequest.getCategory(), "")));
            
            // Create item
            Item item = new Item();
            item.setName(itemRequest.getName());
            item.setCategory(category);
            item.setStock(itemRequest.getStock());
            item.setPrice(itemRequest.getPrice());
            item.setDescription(itemRequest.getDescription());
            
            Item createdItem = itemService.createItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Update item
    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @Valid @RequestBody ItemRequest itemRequest) {
        try {
            // Find or create category
            Category category = categoryService.getCategoryByName(itemRequest.getCategory())
                    .orElseGet(() -> categoryService.createCategory(new Category(itemRequest.getCategory(), "")));
            
            // Create item for update
            Item item = new Item();
            item.setName(itemRequest.getName());
            item.setCategory(category);
            item.setStock(itemRequest.getStock());
            item.setPrice(itemRequest.getPrice());
            item.setDescription(itemRequest.getDescription());
            
            Item updatedItem = itemService.updateItem(id, item);
            return ResponseEntity.ok(updatedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Delete item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get low stock items
    @GetMapping("/items/low-stock")
    public ResponseEntity<List<Item>> getLowStockItems(@RequestParam(defaultValue = "10") Integer threshold) {
        List<Item> items = itemService.getLowStockItems(threshold);
        return ResponseEntity.ok(items);
    }
    
    // Get dashboard statistics
    @GetMapping("/dashboard/stats")
    public ResponseEntity<ItemService.DashboardStats> getDashboardStats() {
        ItemService.DashboardStats stats = itemService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }
    
    // Inner class for request DTO
    public static class ItemRequest {
        private String name;
        private String category;
        private Integer stock;
        private BigDecimal price;
        private String description;
        
        // Constructors
        public ItemRequest() {}
        
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        
        public Integer getStock() { return stock; }
        public void setStock(Integer stock) { this.stock = stock; }
        
        public BigDecimal getPrice() { return price; }
        public void setPrice(BigDecimal price) { this.price = price; }
        
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}
