import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Package, LogOut, Plus, Search, MessageSquare, Loader2 } from "lucide-react"
import { type User } from "@/lib/api"
import { apiService } from "@/lib/api"

interface ChatViewProps {
  user: User
  onViewChange: (view: string) => void
  onLogout: () => void
}

export function ChatView({ user, onViewChange, onLogout }: ChatViewProps) {
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  const handleSuggestedQuestion = (question: string) => {
    setChatInput(question)
    // Auto-submit the question
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) {
        form.requestSubmit()
      }
    }, 100)
  }

  const renderMarkdown = (text: string) => {
    // Convert basic markdown to HTML
    let html = text
      // Bold text: **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic text: *text* -> <em>text</em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Line breaks: \n -> <br>
      .replace(/\n/g, '<br>')
      // Bullet points: - item -> • item
      .replace(/^- (.*$)/gm, '• $1')
      // Numbered lists: 1. item -> 1. item (keep as is)
      .replace(/^(\d+)\. (.*$)/gm, '$1. $2')
    
    return html
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || !user) return

    const userMessage = chatInput.trim()
    setChatInput("")
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setChatLoading(true)

    try {
      const response = await apiService.chatWithInventory({
        username: user.username,
        text: userMessage
      })


      
      if (response.success) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: response.response }])
      } else {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${response.error || 'Unknown error occurred'}` 
        }])
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry, I encountered an error: ${err instanceof Error ? err.message : 'Unknown error'}` 
      }])
    } finally {
      setChatLoading(false)
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
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={() => onViewChange("search")}>
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="default" className="w-full justify-start gap-3">
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
        <div className="flex-1 flex flex-col">
          <div className="p-8 border-b">
            <h2 className="text-3xl font-bold text-balance mb-2">Chat with Your Inventory</h2>
            <p className="text-muted-foreground text-pretty">
              Ask questions about your items in natural language
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-4">
              {chatMessages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground mb-6">
                    Try asking one of these questions or write your own:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    <Button 
                      variant="outline" 
                      className="text-left justify-start h-auto p-3"
                      onClick={() => handleSuggestedQuestion("How many M6 bolts do I have?")}
                    >
                      <span className="text-sm">How many M6 bolts do I have?</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-left justify-start h-auto p-3"
                      onClick={() => handleSuggestedQuestion("What's in my garage?")}
                    >
                      <span className="text-sm">What's in my garage?</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-left justify-start h-auto p-3"
                      onClick={() => handleSuggestedQuestion("What's the largest M8 Screw I have?")}
                    >
                      <span className="text-sm">What's the largest M8 Screw I have?</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-left justify-start h-auto p-3"
                      onClick={() => handleSuggestedQuestion("Do I have an M6 Nut?")}
                    >
                      <span className="text-sm">Do I have an M6 Nut?</span>
                    </Button>
                  </div>
                </div>
              ) : (
                chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted border'
                    }`}>
                      <div 
                        className="text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
                      />
                    </div>
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted border px-4 py-3 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-8 border-t">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about your inventory..."
                  disabled={chatLoading}
                  className="flex-1 border-2 focus:border-primary"
                />
                <Button type="submit" disabled={chatLoading || !chatInput.trim()}>
                  {chatLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
