"use client"

import { Card, CardContent } from "./ui/card"

export default function Home({ setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>Blockchain-Powered Property Registry</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 leading-tight">
            Welcome to Land Ledger
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary blockchain-based property management platform with advanced 3D satellite mapping, secure
            transactions, and transparent ownership records
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card
            className="property-card-hover cursor-pointer group border-0 shadow-lg bg-gradient-to-br from-card to-card/50"
            onClick={() => setCurrentPage("dashboard")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Dashboard</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Comprehensive overview of your property portfolio with real-time analytics and insights
              </p>
            </CardContent>
          </Card>

          <Card
            className="property-card-hover cursor-pointer group border-0 shadow-lg bg-gradient-to-br from-card to-card/50"
            onClick={() => setCurrentPage("properties")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Properties</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Search and explore properties with advanced 3D satellite mapping and detailed information
              </p>
            </CardContent>
          </Card>

          <Card
            className="property-card-hover cursor-pointer group border-0 shadow-lg bg-gradient-to-br from-card to-card/50"
            onClick={() => setCurrentPage("register")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Register Property</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Securely register new properties on the blockchain with immutable ownership records
              </p>
            </CardContent>
          </Card>

          <Card
            className="property-card-hover cursor-pointer group border-0 shadow-lg bg-gradient-to-br from-card to-card/50"
            onClick={() => setCurrentPage("blockchain")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-foreground">Blockchain</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                View all blockchain transactions and verify property ownership with complete transparency
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-muted/50 backdrop-blur-sm px-6 py-3 rounded-full">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure & Verified</span>
            </div>
            <div className="w-1 h-4 bg-border"></div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>Blockchain Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
