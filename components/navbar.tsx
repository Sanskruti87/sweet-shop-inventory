"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="bg-card border-b border-border shadow-md sticky top-0 z-40 backdrop-blur-sm bg-card/95">
      <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden flex-shrink-0 hover:bg-primary/10 transition-all duration-300 ease-out"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold text-gradient">Sweet Bliss</h1>
            <p className="text-xs text-muted-foreground">Premium Inventory</p>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground text-right font-medium">
          Inventory Management System
        </div>
      </div>
    </nav>
  )
}
