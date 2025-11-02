"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import ItemForm from "@/components/pages/item-form"
import Footer from "@/components/footer"

export default function AddItemPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Add New Item</h1>
              <p className="text-muted-foreground">Add a new sweet item to your inventory</p>
            </div>
            <ItemForm />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
