package com.sweetshop.service;

import com.sweetshop.model.Item;
import com.sweetshop.model.Category;
import com.sweetshop.repository.ItemRepository;
import com.sweetshop.repository.CategoryRepository;
import com.sweetshop.exception.ResourceNotFoundException;
import com.sweetshop.exception.ResourceAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // Get all items
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }
    
    // Get all items with pagination
    public Page<Item> getAllItems(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }
    
    // Get item by ID
    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }
    
    // Create new item
    public Item createItem(Item item) {
        // Check if item with same name already exists
        if (itemRepository.existsByName(item.getName())) {
            throw new ResourceAlreadyExistsException("Item", item.getName());
        }
        
        // Ensure category exists
        Category category = findOrCreateCategory(item.getCategory().getName());
        item.setCategory(category);
        return itemRepository.save(item);
    }
    
    // Update item
    public Item updateItem(Long id, Item itemDetails) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item", id));
        
        item.setName(itemDetails.getName());
        
        // Handle category update
        Category category = findOrCreateCategory(itemDetails.getCategory().getName());
        item.setCategory(category);
        
        item.setStock(itemDetails.getStock());
        item.setPrice(itemDetails.getPrice());
        item.setDescription(itemDetails.getDescription());
        
        return itemRepository.save(item);
    }
    
    // Delete item
    public void deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item", id);
        }
        itemRepository.deleteById(id);
    }
    
    // Search items by name
    public List<Item> searchItemsByName(String name) {
        return itemRepository.findByNameContainingIgnoreCase(name);
    }
    
    // Get items by category
    public List<Item> getItemsByCategory(String categoryName) {
        return itemRepository.findByCategoryName(categoryName);
    }
    
    // Get items by category with pagination
    public Page<Item> getItemsByCategory(String categoryName, Pageable pageable) {
        return itemRepository.findByCategoryName(categoryName, pageable);
    }
    
    // Get low stock items
    public List<Item> getLowStockItems(Integer threshold) {
        return itemRepository.findLowStockItems(threshold);
    }
    
    // Get items by price range
    public List<Item> getItemsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return itemRepository.findByPriceRange(minPrice, maxPrice);
    }
    
    // Get items by stock range
    public List<Item> getItemsByStockRange(Integer minStock, Integer maxStock) {
        return itemRepository.findByStockRange(minStock, maxStock);
    }
    
    // Complex search
    public List<Item> searchItems(String name, String categoryName, 
                                 BigDecimal minPrice, BigDecimal maxPrice,
                                 Integer minStock, Integer maxStock) {
        return itemRepository.findByMultipleCriteria(name, categoryName, 
                                                    minPrice, maxPrice, 
                                                    minStock, maxStock);
    }
    
    // Get dashboard statistics
    public DashboardStats getDashboardStats() {
        Long totalItems = itemRepository.getTotalItemCount();
        Long totalStock = itemRepository.getTotalStockQuantity();
        BigDecimal totalValue = itemRepository.getTotalStockValue();
        List<Item> lowStockItems = itemRepository.findLowStockItems(10);
        
        return new DashboardStats(totalItems, totalStock, totalValue, lowStockItems.size());
    }
    
    // Helper method to find or create category
    private Category findOrCreateCategory(String categoryName) {
        Optional<Category> existingCategory = categoryRepository.findByNameIgnoreCase(categoryName);
        if (existingCategory.isPresent()) {
            return existingCategory.get();
        } else {
            Category newCategory = new Category(categoryName, "Auto-generated category");
            return categoryRepository.save(newCategory);
        }
    }
    
    // Inner class for dashboard statistics
    public static class DashboardStats {
        private final Long totalItems;
        private final Long totalStock;
        private final BigDecimal totalValue;
        private final Integer lowStockItems;
        
        public DashboardStats(Long totalItems, Long totalStock, BigDecimal totalValue, Integer lowStockItems) {
            this.totalItems = totalItems;
            this.totalStock = totalStock;
            this.totalValue = totalValue;
            this.lowStockItems = lowStockItems;
        }
        
        public Long getTotalItems() { return totalItems; }
        public Long getTotalStock() { return totalStock; }
        public BigDecimal getTotalValue() { return totalValue; }
        public Integer getLowStockItems() { return lowStockItems; }
    }
}
