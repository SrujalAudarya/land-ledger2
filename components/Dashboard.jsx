"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"

export default function Dashboard({ account, balance, networkId }) {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    {
      title: "Total Properties",
      value: "12",
      change: "+2 this month",
      changeType: "positive",
      color: "text-primary",
    },
    {
      title: "Total Value",
      value: "$2.4M",
      change: "+12% this year",
      changeType: "positive",
      color: "text-accent",
    },
    {
      title: "Transactions",
      value: "48",
      change: "+8 this week",
      changeType: "positive",
      color: "text-primary",
    },
    {
      title: "Verified Properties",
      value: "11",
      change: "91% verified",
      changeType: "neutral",
      color: "text-accent",
    },
  ]

  const recentProperties = [
    {
      id: "LAND001",
      title: "Premium Residential Plot",
      location: "Downtown District",
      value: "$450,000",
      status: "Verified",
      date: "2 days ago",
      change: "+5.2%",
    },
    {
      id: "LAND002",
      title: "Commercial Development Land",
      location: "Business Park",
      value: "$850,000",
      status: "Verified",
      date: "5 days ago",
      change: "+2.1%",
    },
    {
      id: "LAND003",
      title: "Agricultural Farmland",
      location: "Green Valley",
      value: "$120,000",
      status: "Pending",
      date: "1 week ago",
      change: "+0.8%",
    },
  ]

  const recentTransactions = [
    {
      id: "TX001",
      type: "Property Registration",
      property: "LAND001",
      amount: "$450,000",
      status: "Completed",
      date: "2 hours ago",
      hash: "0x742d35Cc...5b8c",
    },
    {
      id: "TX002",
      type: "Ownership Transfer",
      property: "LAND002",
      amount: "$850,000",
      status: "Completed",
      date: "1 day ago",
      hash: "0x8ba1f109...213c",
    },
    {
      id: "TX003",
      type: "Property Update",
      property: "LAND003",
      amount: "-",
      status: "Pending",
      date: "3 days ago",
      hash: "0x1234567...5678",
    },
  ]

  const portfolioData = [
    { category: "Residential", value: 45, color: "bg-primary" },
    { category: "Commercial", value: 30, color: "bg-accent" },
    { category: "Agricultural", value: 15, color: "bg-secondary" },
    { category: "Industrial", value: 10, color: "bg-muted-foreground" },
  ]

  const getNetworkName = (chainId) => {
    const networks = {
      "0x1": "Ethereum",
      "0x89": "Polygon",
      "0x5": "Goerli",
    }
    return networks[chainId] || "Unknown"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Portfolio Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your comprehensive property portfolio overview.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{getNetworkName(networkId)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg">
              <span className="text-sm text-muted-foreground">Balance:</span>
              <span className="text-sm font-mono font-medium">{balance} ETH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="property-card-hover shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  <p
                    className={`text-xs ${
                      stat.changeType === "positive"
                        ? "text-accent"
                        : stat.changeType === "negative"
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Composition */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Portfolio Composition</CardTitle>
            <p className="text-sm text-muted-foreground">Property distribution by type</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolioData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Properties */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Recent Properties</CardTitle>
            <p className="text-sm text-muted-foreground">Latest property activities</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground text-sm">{property.title}</p>
                      <Badge
                        variant={property.status === "Verified" ? "default" : "secondary"}
                        className={`text-xs ${property.status === "Verified" ? "bg-accent/10 text-accent" : ""}`}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{property.location}</p>
                    <p className="text-xs text-muted-foreground">{property.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent text-sm">{property.value}</p>
                    <p className="text-xs text-accent">{property.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">Manage your properties</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
              Register New Property
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Search Properties
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              View Blockchain
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Analytics Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-foreground">Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">Latest blockchain activities</p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.status === "Completed" ? "bg-accent/10" : "bg-secondary/10"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold ${transaction.status === "Completed" ? "text-accent" : "text-secondary"}`}
                    >
                      TX
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{transaction.type}</p>
                    <p className="text-xs text-muted-foreground">Property: {transaction.property}</p>
                    <p className="text-xs text-muted-foreground font-mono">{transaction.hash}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground text-sm">{transaction.amount}</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={transaction.status === "Completed" ? "default" : "secondary"}
                      className={`text-xs ${transaction.status === "Completed" ? "bg-accent/10 text-accent" : ""}`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
