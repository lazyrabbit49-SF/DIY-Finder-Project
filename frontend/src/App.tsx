"use client"

import { useState, useEffect } from "react"
import { apiService, type User, type InventoryItem } from "@/lib/api"
import { LoginView } from "@/components/views/LoginView"
import { DashboardView } from "@/components/views/DashboardView"
import { AddItemView } from "@/components/views/AddItemView"
import { SearchView } from "@/components/views/SearchView"
import { ChatView } from "@/components/views/ChatView"

export default function DIYVisualFinder() {
  const [currentView, setCurrentView] = useState<"login" | "dashboard" | "add-item" | "search" | "chat">("login")
  const [user, setUser] = useState<User | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load user inventory when user logs in
  useEffect(() => {
    if (user?.username) {
      loadUserInventory()
    }
  }, [user?.username])

  const loadUserInventory = async () => {
    if (!user?.username) return
    
    try {
      setLoading(true)
      const response = await apiService.getUserItems(user.username)
      if (response.success) {
        setInventory(response.items)
      } else {
        setError(response.error || 'Failed to load inventory')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    setCurrentView("dashboard")
    // Remove console.log for production
  }

  const handleLogout = () => {
    setUser(null)
    setInventory([])
    setCurrentView("login")
  }

  const handleViewChange = (view: string) => {
    setCurrentView(view as any)
  }

  const handleItemAdded = () => {
    loadUserInventory()
  }

  // Render current view
  switch (currentView) {
    case "login":
      return <LoginView onLogin={handleLogin} />
    case "dashboard":
      return (
        <DashboardView 
          user={user!}
          inventory={inventory}
          loading={loading}
          error={error}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
          onRetryLoad={loadUserInventory}
        />
      )
    case "add-item":
      return (
        <AddItemView 
          user={user!}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
          onItemAdded={handleItemAdded}
        />
      )
    case "search":
      return (
        <SearchView 
          user={user!}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
        />
      )
    case "chat":
      return (
        <ChatView 
          user={user!}
          onViewChange={handleViewChange}
          onLogout={handleLogout}
        />
      )
    default:
      return <LoginView onLogin={handleLogin} />
  }
}
