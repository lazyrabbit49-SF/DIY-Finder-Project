import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Package, LogOut, Plus, Search, MessageSquare, Loader2 } from "lucide-react"
import { type User } from "@/lib/api"
import { apiService } from "@/lib/api"

interface SearchViewProps {
  user: User
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function SearchView({ user, onViewChange, onLogout }: SearchViewProps) {
  const [searchImage, setSearchImage] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearchImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSearchImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchImage || !user) return

    setSearchLoading(true)
    setError(null)

    try {
      const response = await apiService.searchItems({
        image: searchImage,
        username: user.username
      })

      if (response.success) {
        setSearchResults(response.results)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
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
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => onViewChange("dashboard")}>
              <Package className="w-4 h-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => onViewChange("add-item")}>
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
            <Button variant="default" className="w-full justify-start gap-3">
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => onViewChange("chat")}>
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-balance mb-2">Search Inventory</h2>
              <p className="text-muted-foreground text-pretty">
                Find similar items by uploading a photo
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Search Image</CardTitle>
                  <CardDescription>Upload a photo to find similar items in your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    {searchImage ? (
                      <div className="space-y-4">
                        <img 
                          src={searchImage} 
                          alt="Search image" 
                          className="max-w-xs mx-auto rounded-lg"
                        />
                        <div className="flex gap-2 justify-center">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setSearchImage(null)
                              setSearchResults([])
                            }}
                          >
                            Remove Image
                          </Button>
                          <Button type="submit" disabled={searchLoading}>
                            {searchLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Search Similar Items
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Search className="w-12 h-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">Upload Search Photo</p>
                          <p className="text-sm text-muted-foreground">
                            AI will find similar items in your inventory
                          </p>
                        </div>
                        <Button asChild size="lg" className="px-8">
                          <label htmlFor="search-photo-upload" className="cursor-pointer flex items-center gap-2">
                            <Search className="w-5 h-5" />
                            Choose File
                          </label>
                        </Button>
                        <input
                          id="search-photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleSearchImageUpload}
                          className="hidden"
                          required
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Search Results</CardTitle>
                  <CardDescription>Found {searchResults.length} similar items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{result.name || "Unknown Item"}</h3>
                            <p className="text-sm text-muted-foreground">{result.category || "hardware"}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {result.location || "Unknown"} • {result.storage_box || "General"}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {Math.round(result.score * 100)}% match
                          </Badge>
                        </div>
                        {result.image_data && (
                          <img 
                            src={result.image_data} 
                            alt={result.name || "Search result"}
                            className="w-full h-32 object-cover rounded"
                          />
                        )}
                        <p className="text-sm">{result.description || "No description available"}</p>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Qty: {result.quantity || 1}</span>
                          <span>{result.condition || "unknown"}</span>
                        </div>
                        {result.brand && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium">Brand:</span>
                            <span className="text-muted-foreground">{result.brand}</span>
                          </div>
                        )}
                        {result.size && (
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium">Size:</span>
                            <span className="text-muted-foreground">{result.size}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
