"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  category: string
  stock: string
  price: string
  description: string
}

const categories = ["Dry Sweet", "Bengali Sweet", "Traditional", "Milk Sweet", "Syrup-based"]

export default function ItemForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    stock: "",
    price: "",
    description: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Sweet name is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.stock) {
      newErrors.stock = "Stock quantity is required"
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a positive number"
    }

    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
    if (errors.category) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch("/api/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            stock: Number(formData.stock),
            price: Number(formData.price),
            description: formData.description,
          }),
        })

        if (response.ok) {
          setSubmitStatus("success")
          setFormData({
            name: "",
            category: "",
            stock: "",
            price: "",
            description: "",
          })

          // Redirect to inventory page after 2 seconds
          setTimeout(() => {
            router.push("/inventory")
          }, 2000)
        } else {
          setSubmitStatus("error")
        }
      } catch (error) {
        console.error("Failed to submit form:", error)
        setSubmitStatus("error")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      category: "",
      stock: "",
      price: "",
      description: "",
    })
    setErrors({})
    setSubmitStatus(null)
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Item Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success Alert */}
          {submitStatus === "success" && (
            <Alert className="bg-primary/10 border-primary/30 text-primary">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Item added successfully! Redirecting...</AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {submitStatus === "error" && (
            <Alert className="bg-destructive/10 border-destructive/30 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to add item. Please try again.</AlertDescription>
            </Alert>
          )}

          {/* Sweet Name */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Sweet Name *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Kaju Katli"
              className={`bg-input border-border ${errors.name ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Category *</label>
            <Select value={formData.category} onValueChange={handleCategoryChange} disabled={isSubmitting}>
              <SelectTrigger className={`bg-input border-border ${errors.category ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
          </div>

          {/* Stock and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stock Quantity */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Stock Quantity *</label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="e.g., 20"
                className={`bg-input border-border ${errors.stock ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.stock && <p className="text-sm text-destructive mt-1">{errors.stock}</p>}
            </div>

            {/* Price per kg */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Price per kg (₹) *</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 600"
                className={`bg-input border-border ${errors.price ? "border-destructive" : ""}`}
                disabled={isSubmitting}
              />
              {errors.price && <p className="text-sm text-destructive mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the sweet item..."
              rows={4}
              className={`w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.description ? "border-destructive" : ""}`}
              disabled={isSubmitting}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="border-border bg-transparent"
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Item"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
