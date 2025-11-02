"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import CategoriesGrid from "@/components/pages/categories-grid"
import Footer from "@/components/footer"

export default function CategoriesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
              <p className="text-muted-foreground">Browse sweet categories</p>
            </div>
            <CategoriesGrid />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
