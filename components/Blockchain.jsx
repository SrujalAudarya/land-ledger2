"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export default function Blockchain() {
  const [searchHash, setSearchHash] = useState("")
  const [selectedBlock, setSelectedBlock] = useState(null)

  // Mock blockchain data
  const blocks = [
    {
      number: 18542891,
      hash: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
      timestamp: "2024-01-15 14:30:25",
      transactions: 156,
      gasUsed: "12,456,789",
      size: "45.2 KB",
      miner: "0x8ba1f109551bD432803012645Hac136c30c6213c",
    },
    {
      number: 18542890,
      hash: "0x8ba1f109551bD432803012645Hac136c30c6213c",
      timestamp: "2024-01-15 14:28:12",
      transactions: 203,
      gasUsed: "15,234,567",
      size: "52.8 KB",
      miner: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      number: 18542889,
      hash: "0x1234567890abcdef1234567890abcdef12345678",
      timestamp: "2024-01-15 14:25:48",
      transactions: 89,
      gasUsed: "8,765,432",
      size: "38.1 KB",
      miner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
    },
  ]

  const transactions = [
    {
      hash: "0xa1b2c3d4e5f6789012345678901234567890abcdef",
      block: 18542891,
      from: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
      to: "0x8ba1f109551bD432803012645Hac136c30c6213c",
      value: "2.5 ETH",
      gasPrice: "25 Gwei",
      gasUsed: "21,000",
      status: "Success",
      timestamp: "2024-01-15 14:30:25",
      type: "Property Registration",
      propertyId: "LAND001",
    },
    {
      hash: "0xb2c3d4e5f6789012345678901234567890abcdef1",
      block: 18542890,
      from: "0x8ba1f109551bD432803012645Hac136c30c6213c",
      to: "0x1234567890abcdef1234567890abcdef12345678",
      value: "5.8 ETH",
      gasPrice: "28 Gwei",
      gasUsed: "45,000",
      status: "Success",
      timestamp: "2024-01-15 14:28:12",
      type: "Ownership Transfer",
      propertyId: "LAND002",
    },
    {
      hash: "0xc3d4e5f6789012345678901234567890abcdef12",
      block: 18542889,
      from: "0x1234567890abcdef1234567890abcdef12345678",
      to: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
      value: "0.1 ETH",
      gasPrice: "22 Gwei",
      gasUsed: "35,000",
      status: "Pending",
      timestamp: "2024-01-15 14:25:48",
      type: "Property Update",
      propertyId: "LAND003",
    },
  ]

  const propertyTransactions = [
    {
      propertyId: "LAND001",
      title: "Premium Residential Plot",
      totalTransactions: 5,
      lastActivity: "2 hours ago",
      owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
      value: "$450,000",
      status: "Active",
    },
    {
      propertyId: "LAND002",
      title: "Commercial Development Land",
      totalTransactions: 8,
      lastActivity: "1 day ago",
      owner: "0x8ba1f109551bD432803012645Hac136c30c6213c",
      value: "$850,000",
      status: "Active",
    },
    {
      propertyId: "LAND003",
      title: "Agricultural Farmland",
      totalTransactions: 3,
      lastActivity: "3 days ago",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      value: "$120,000",
      status: "Pending",
    },
  ]

  const handleSearch = () => {
    // Mock search functionality
    console.log("[v0] Searching for:", searchHash)
  }

  const formatHash = (hash) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
      case "Active":
        return "bg-accent/10 text-accent"
      case "Pending":
        return "bg-secondary/10 text-secondary"
      case "Failed":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted/10 text-muted-foreground"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Blockchain Explorer</h1>
        <p className="text-muted-foreground">
          Explore blockchain transactions, blocks, and property records with complete transparency
        </p>
      </div>

      {/* Search Section */}
      <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-card to-card/50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by transaction hash, block number, or address..."
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-2 border-border focus:border-primary transition-colors"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              Search Blockchain
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Data Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">Latest property-related blockchain transactions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(tx.status)}>{tx.status}</Badge>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {tx.type}
                          </Badge>
                          {tx.propertyId && (
                            <Badge variant="outline" className="bg-accent/10 text-accent">
                              {tx.propertyId}
                            </Badge>
                          )}
                        </div>
                        <p className="font-mono text-sm text-foreground">
                          <strong>Hash:</strong> {formatHash(tx.hash)}
                        </p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>
                            <strong>From:</strong> {formatHash(tx.from)}
                          </p>
                          <p>
                            <strong>To:</strong> {formatHash(tx.to)}
                          </p>
                          <p>
                            <strong>Block:</strong> {tx.block.toLocaleString()}
                          </p>
                          <p>
                            <strong>Gas Used:</strong> {tx.gasUsed}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-accent">{tx.value}</p>
                        <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                        <p className="text-sm text-muted-foreground">Gas: {tx.gasPrice}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Blocks Tab */}
        <TabsContent value="blocks">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Recent Blocks</CardTitle>
              <p className="text-sm text-muted-foreground">Latest blockchain blocks containing property transactions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blocks.map((block, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedBlock(block)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-primary/10 text-primary">Block #{block.number.toLocaleString()}</Badge>
                          <Badge variant="outline">{block.transactions} transactions</Badge>
                        </div>
                        <p className="font-mono text-sm text-foreground">
                          <strong>Hash:</strong> {formatHash(block.hash)}
                        </p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Miner:</strong> {formatHash(block.miner)}
                          </p>
                          <p>
                            <strong>Gas Used:</strong> {block.gasUsed}
                          </p>
                          <p>
                            <strong>Size:</strong> {block.size}
                          </p>
                          <p>
                            <strong>Timestamp:</strong> {block.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Properties Tab */}
        <TabsContent value="properties">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Property Blockchain Records</CardTitle>
              <p className="text-sm text-muted-foreground">All registered properties and their blockchain activity</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyTransactions.map((property, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-accent/10 text-accent">{property.propertyId}</Badge>
                          <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                        </div>
                        <p className="font-semibold text-foreground">{property.title}</p>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Owner:</strong> {formatHash(property.owner)}
                          </p>
                          <p>
                            <strong>Transactions:</strong> {property.totalTransactions}
                          </p>
                          <p>
                            <strong>Last Activity:</strong> {property.lastActivity}
                          </p>
                          <p>
                            <strong>Value:</strong> {property.value}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Button variant="outline" size="sm">
                          View History
                        </Button>
                        <Button variant="outline" size="sm">
                          Verify Ownership
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Network Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Total Properties</span>
                  <span className="text-sm font-semibold text-accent">1,247</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Total Transactions</span>
                  <span className="text-sm font-semibold text-accent">5,892</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Total Value Locked</span>
                  <span className="text-sm font-semibold text-accent">$45.2M</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Active Users</span>
                  <span className="text-sm font-semibold text-accent">892</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Transaction Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Property Registration</span>
                  <span className="text-sm font-semibold text-primary">45%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Ownership Transfer</span>
                  <span className="text-sm font-semibold text-primary">32%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Property Updates</span>
                  <span className="text-sm font-semibold text-primary">18%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm font-medium text-foreground">Verification</span>
                  <span className="text-sm font-semibold text-primary">5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
