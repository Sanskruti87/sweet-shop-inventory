"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/inventory", label: "Inventory", icon: "📦" },
  { href: "/add-item", label: "Add Item", icon: "➕" },
  { href: "/categories", label: "Categories", icon: "🏷️" },
  { href: "/orders", label: "Orders", icon: "🛒" },
]

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between md:justify-start border-b border-sidebar-border">
          <h2 className="text-lg sm:text-xl font-bold text-sidebar-primary">Sweet Bliss</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden flex-shrink-0">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="px-3 sm:px-4 py-4 space-y-2 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "default" : "ghost"}
                className="w-full justify-start gap-3 text-sm sm:text-base"
                onClick={onClose}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
