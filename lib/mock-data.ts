export const mockSweets = [
  { id: 1, name: "Kaju Katli", category: { id: 1, name: "Dry Sweet", description: "Dry sweets and fudges" }, stock: 20, price: 600, description: "Delicious cashew fudge" },
  {
    id: 2,
    name: "Rasgulla",
    category: { id: 2, name: "Bengali Sweet", description: "Traditional Bengali sweets" },
    stock: 45,
    price: 350,
    description: "Soft spongy balls in syrup",
  },
  { id: 3, name: "Laddu", category: { id: 3, name: "Traditional", description: "Classic Indian sweets" }, stock: 8, price: 250, description: "Round sweet balls" },
  {
    id: 4,
    name: "Gulab Jamun",
    category: { id: 5, name: "Syrup-based", description: "Sweets in syrup" },
    stock: 35,
    price: 300,
    description: "Fried milk solids in syrup",
  },
  { id: 5, name: "Barfi", category: { id: 4, name: "Milk Sweet", description: "Milk-based sweets" }, stock: 15, price: 400, description: "Milk-based fudge" },
  { id: 6, name: "Jalebi", category: { id: 5, name: "Syrup-based", description: "Sweets in syrup" }, stock: 5, price: 200, description: "Spiral sweet in syrup" },
  { id: 7, name: "Kheer", category: { id: 4, name: "Milk Sweet", description: "Milk-based sweets" }, stock: 12, price: 280, description: "Rice pudding" },
  { id: 8, name: "Halwa", category: { id: 3, name: "Traditional", description: "Classic Indian sweets" }, stock: 22, price: 350, description: "Semolina pudding" },
]

export const mockCategories = [
  { id: 1, name: "Dry Sweet", description: "Dry sweets and fudges", itemCount: 1 },
  { id: 2, name: "Bengali Sweet", description: "Traditional Bengali sweets", itemCount: 1 },
  { id: 3, name: "Traditional", description: "Classic Indian sweets", itemCount: 2 },
  { id: 4, name: "Milk Sweet", description: "Milk-based sweets", itemCount: 2 },
  { id: 5, name: "Syrup-based", description: "Sweets in syrup", itemCount: 2 },
]
