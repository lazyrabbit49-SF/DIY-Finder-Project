import React from "react"
import { Button } from "@/components/ui/button"
import { Package, LogOut, Plus, Search, MessageSquare, Grid3X3 } from "lucide-react"
import { type User } from "@/lib/api"

interface SidebarProps {
  user: User
  currentView: string
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function Sidebar({ user, currentView, onViewChange, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border p-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-sidebar-foreground">DIY Finder</h1>
          <p className="text-sm text-muted-foreground">Welcome, {user?.username}</p>
        </div>
      </div>

      <nav className="space-y-2">
        <Button 
          variant={currentView === "dashboard" ? "default" : "ghost"} 
          className="w-full justify-start gap-3" 
          onClick={() => onViewChange("dashboard")}
        >
          <Grid3X3 className="w-4 h-4" />
          Dashboard
        </Button>
        <Button 
          variant={currentView === "add-item" ? "default" : "ghost"} 
          className="w-full justify-start gap-3" 
          onClick={() => onViewChange("add-item")}
        >
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
        <Button 
          variant={currentView === "search" ? "default" : "ghost"} 
          className="w-full justify-start gap-3" 
          onClick={() => onViewChange("search")}
        >
          <Search className="w-4 h-4" />
          Search
        </Button>
        <Button 
          variant={currentView === "chat" ? "default" : "ghost"} 
          className="w-full justify-start gap-3" 
          onClick={() => onViewChange("chat")}
        >
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
      </nav>

      <div className="mt-auto pt-8">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
