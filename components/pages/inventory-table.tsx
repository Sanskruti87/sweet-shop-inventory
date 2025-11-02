"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Package } from "lucide-react"

interface Sweet {
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

interface InventoryTableProps {
  sweets: Sweet[]
  onDelete: (id: number) => void
  onRefresh: () => void
}

export default function InventoryTable({ sweets, onDelete, onRefresh }: InventoryTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (id: number) => {
    setIsDeleting(true)
    try {
      onDelete(id)
      setDeleteId(null)
      onRefresh()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Card className="card-premium">
        <CardHeader className="pb-4 sm:pb-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg sm:text-xl font-bold">Sweet Items</CardTitle>
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">{sweets.length} items</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {sweets.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No items found</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Name
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Category
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Stock
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Price/kg
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sweets.map((sweet) => (
                    <tr
                      key={sweet.id}
                      className="border-b border-border hover:bg-primary/5 transition-all duration-300 ease-out group"
                    >
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        <div>
                          <p className="font-semibold text-foreground text-xs sm:text-sm group-hover:text-primary transition-all duration-300 ease-out">
                            {sweet.name}
                          </p>
                          <p className="text-xs text-muted-foreground hidden sm:block mt-1">{sweet.description}</p>
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        <Badge
                          variant="outline"
                          className="bg-secondary/10 text-secondary border-secondary/30 text-xs font-medium"
                        >
                          {sweet.category.name}
                        </Badge>
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 font-semibold text-foreground text-xs sm:text-sm">
                        {sweet.stock}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4 text-foreground text-xs sm:text-sm font-medium">
                        ₹{sweet.price}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        {sweet.stock < 10 ? (
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs font-medium">
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-medium">
                            Normal
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 sm:py-4 px-3 sm:px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10 hover:text-primary h-8 w-8 p-0 transition-all duration-300 ease-out"
                            onClick={() => console.log("Edit:", sweet.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0 transition-all duration-300 ease-out"
                            onClick={() => setDeleteId(sweet.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
