import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, LogOut, Plus, Search, MessageSquare, Camera, Upload, Loader2 } from "lucide-react"
import { type User } from "@/lib/api"
import { apiService } from "@/lib/api"

interface AddItemViewProps {
  user: User
  onViewChange: (view: string) => void
  onLogout: () => void
  onItemAdded: () => void
}

export function AddItemView({ user, onViewChange, onLogout, onItemAdded }: AddItemViewProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [addItemLoading, setAddItemLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        setUploadedImage(imageData)
        
        // Automatically process and add item
        if (user) {
          try {
            setAddItemLoading(true)
            const response = await apiService.addItem({
              name: "",
              category: "",
              description: "",
              quantity: 1,
              location: "",
              storage_box: "",
              brand: "",
              size: "",
              condition: "good",
              image: imageData,
              username: user.username
            })
            
            if (response.success) {
              // Item successfully added - automatically go to dashboard
              setAddItemLoading(false)  // Reset loading state before redirect
              onItemAdded()
              onViewChange("dashboard")
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add item')
            setAddItemLoading(false)
          }
        }
      }
      reader.readAsDataURL(file)
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
            <Button variant="default" className="w-full justify-start gap-3">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => onViewChange("search")}>
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
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-balance mb-2">Add New Item</h2>
              <p className="text-muted-foreground text-pretty">
                Upload a photo and AI will automatically process and add it to your inventory
              </p>
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  The magic of modern image processing. Just upload a photo and let AI do the rest! ✨
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label>Item Photo</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      {addItemLoading ? (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-balance">AI Processing Your Item...</p>
                            <p className="text-sm text-muted-foreground text-pretty">
                              Please wait while we analyze and add your item to inventory
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            🤖 AI is analyzing your image and adding it to your inventory...
                          </div>
                        </div>
                      ) : uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage}
                            alt="Uploaded item"
                            className="max-w-full h-48 object-contain mx-auto rounded-lg"
                          />
                          <Button type="button" variant="outline" onClick={() => setUploadedImage(null)}>
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Camera className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-balance">Upload Item Photo</p>
                            <p className="text-sm text-muted-foreground text-pretty">
                              Select an image and we'll automatically process and add it to your inventory
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-3">
                            <Button asChild size="lg" className="px-8">
                              <label htmlFor="photo-upload" className="cursor-pointer flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                Choose File
                              </label>
                            </Button>
                            <input
                              id="photo-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
