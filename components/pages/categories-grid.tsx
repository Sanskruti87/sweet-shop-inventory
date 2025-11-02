"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockSweets } from "@/lib/mock-data"

interface Item {
  id: number
  name: string
  category: {
    id: number
    name: string
    description: string
  }
  stock: number
  price: number
  description: string
}

const categoryIcons: Record<string, string> = {
  "Dry Sweet": "🥜",
  "Bengali Sweet": "🍮",
  Traditional: "🍯",
  "Milk Sweet": "🥛",
  "Syrup-based": "🍯",
}

const categoryDescriptions: Record<string, string> = {
  "Dry Sweet": "Sweets made with dry fruits and nuts",
  "Bengali Sweet": "Traditional Bengali sweets with unique flavors",
  Traditional: "Classic Indian sweets passed down through generations",
  "Milk Sweet": "Creamy sweets made with milk and milk solids",
  "Syrup-based": "Sweets soaked in sugar syrup",
}

export default function CategoriesGrid() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items")
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Failed to fetch items:", error)
        // Fallback to mock data if API fails
        setItems(mockSweets)
      }
    }

    fetchItems()
  }, [])

  const categories = Array.from(new Set(items.map((s) => s.category.name)))

  const getCategoryStats = (category: string) => {
    const categoryItems = items.filter((s) => s.category.name === category)
    const totalStock = categoryItems.reduce((sum, item) => sum + item.stock, 0)
    const totalValue = categoryItems.reduce((sum, item) => sum + item.stock * item.price, 0)

    return {
      itemCount: categoryItems.length,
      totalStock,
      totalValue,
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => {
        const stats = getCategoryStats(category)
        const icon = categoryIcons[category] || "🍬"

        return (
          <Card
            key={category}
            className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/50"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{icon}</div>
                  <div>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{categoryDescriptions[category] || "Category description"}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-primary/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{stats.itemCount}</p>
                  <p className="text-xs text-muted-foreground">Items</p>
                </div>
                <div className="bg-accent/10 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-accent">{stats.totalStock}</p>
                  <p className="text-xs text-muted-foreground">Stock</p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-secondary">₹{(stats.totalValue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground">Value</p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {items
                  .filter((s) => s.category.name === category)
                  .slice(0, 3)
                  .map((sweet) => (
                    <Badge key={sweet.id} variant="secondary" className="bg-secondary/20 text-secondary">
                      {sweet.name}
                    </Badge>
                  ))}
                {stats.itemCount > 3 && (
                  <Badge variant="outline" className="bg-muted/50">
                    +{stats.itemCount - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
