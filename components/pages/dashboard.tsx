"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Package, DollarSign, AlertCircle } from "lucide-react"
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

const categoryData = [
  { name: "Dry Sweet", value: 0 },
  { name: "Bengali Sweet", value: 0 },
  { name: "Traditional", value: 0 },
  { name: "Milk Sweet", value: 0 },
  { name: "Syrup-based", value: 0 },
]

export default function Dashboard() {
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

  // Calculate statistics
  const totalItems = items.length
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0)
  const totalValue = items.reduce((sum, item) => sum + item.stock * item.price, 0)
  const lowStockItems = items.filter((item) => item.stock < 10).length

  // Prepare category data
  const categoryDistribution = categoryData.map((cat) => ({
    ...cat,
    value: items.filter((s) => s.category.name === cat.name).reduce((sum, s) => sum + s.stock, 0),
  }))

  // Prepare stock by category for bar chart
  const stockByCategory = categoryData.map((cat) => ({
    name: cat.name,
    stock: items.filter((s) => s.category.name === cat.name).reduce((sum, s) => sum + s.stock, 0),
  }))

  const COLORS = ["#B8956A", "#E8B4B8", "#F5DEB3", "#DEB887", "#D2B48C"]

  return (
    <div className="p-3 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-base text-muted-foreground font-medium">Welcome to Sweet Bliss Inventory Management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="card-premium bg-gradient-to-br from-primary/8 to-primary/3 border-primary/20 hover-lift group">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Total Items</CardTitle>
              <Package className="w-5 h-5 text-primary/60 group-hover:text-primary transition-all duration-300 ease-out" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-primary">{totalItems}</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Sweet varieties</p>
          </CardContent>
        </Card>

        <Card className="card-premium bg-gradient-to-br from-accent/8 to-accent/3 border-accent/20 hover-lift group">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Total Stock</CardTitle>
              <TrendingUp className="w-5 h-5 text-accent/60 group-hover:text-accent transition-all duration-300 ease-out" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-accent">{totalStock}</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Units in inventory</p>
          </CardContent>
        </Card>

        <Card className="card-premium bg-gradient-to-br from-secondary/8 to-secondary/3 border-secondary/20 hover-lift group">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Total Value</CardTitle>
              <DollarSign className="w-5 h-5 text-secondary/60 group-hover:text-secondary transition-all duration-300 ease-out" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-secondary">₹{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Inventory value</p>
          </CardContent>
        </Card>

        <Card className="card-premium bg-gradient-to-br from-destructive/8 to-destructive/3 border-destructive/20 hover-lift group">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">Low Stock</CardTitle>
              <AlertCircle className="w-5 h-5 text-destructive/60 group-hover:text-destructive transition-all duration-300 ease-out" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl sm:text-4xl font-bold text-destructive">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Items below 10 units</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium hover-lift">
          <CardHeader className="pb-4 sm:pb-6 border-b border-border">
            <CardTitle className="text-lg sm:text-xl font-bold">Stock Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stockByCategory} margin={{ top: 10, right: 15, left: -15, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={90}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="stock" fill="var(--primary)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-premium hover-lift">
          <CardHeader className="pb-4 sm:pb-6 border-b border-border">
            <CardTitle className="text-lg sm:text-xl font-bold">Category Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
