"use client"

import { useState, useMemo, useEffect } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import InventoryTable from "@/components/pages/inventory-table"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

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

export default function InventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/items")
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Failed to fetch items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const categories = ["all", ...new Set(items.map((s) => s.category.name))]

  const filteredAndSortedSweets = useMemo(() => {
    const filtered = items.filter((sweet) => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || sweet.category.name === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "stock-asc":
          return a.stock - b.stock
        case "stock-desc":
          return b.stock - a.stock
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, selectedCategory, sortBy, items])

  const handleRefresh = async () => {
    try {
      const response = await fetch("/api/items")
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Failed to refresh items:", error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Inventory</h1>
              <p className="text-muted-foreground">Manage your sweet shop inventory</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                  <Input
                    placeholder="Search by sweet name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input border-border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                      <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                      <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                      <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                      <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedSweets.length} of {items.length} items
                </p>
                <Link href="/add-item">
                  <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                    Add New Item
                  </Button>
                </Link>
              </div>
            </div>

            {/* Inventory Table */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading inventory...</p>
              </div>
            ) : (
              <InventoryTable sweets={filteredAndSortedSweets} onDelete={() => {}} onRefresh={handleRefresh} />
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
