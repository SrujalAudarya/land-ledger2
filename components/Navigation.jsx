"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export default function Navigation({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home", description: "Main dashboard overview" },
    { id: "dashboard", label: "Dashboard", description: "Property analytics" },
    { id: "properties", label: "Properties", description: "Search & explore" },
    { id: "register", label: "Register Property", description: "Add new property" },
    { id: "blockchain", label: "Blockchain", description: "Transaction history" },
  ]

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleNavClick("home")}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">LL</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary leading-none">Land Ledger</span>
                <span className="text-xs text-muted-foreground leading-none">Blockchain Registry</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm transition-all duration-200 ${
                    currentPage === item.id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "default" : "ghost"}
                        onClick={() => handleNavClick(item.id)}
                        className="w-full justify-start text-left h-auto p-4"
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
