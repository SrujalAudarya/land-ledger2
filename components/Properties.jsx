"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import SatelliteMapView from "./SatelliteMapView"

export default function Properties() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // "grid" or "3d"
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  // Mock property data for demonstration
  const mockProperties = {
    LAND001: {
      id: "LAND001",
      title: "Premium Residential Plot",
      location: "Downtown District, Metro City",
      area: "2,500 sq ft",
      price: "$450,000",
      owner: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
      status: "Verified",
      coordinates: { lat: 40.7128, lng: -74.006 },
      description: "Prime residential plot in the heart of downtown with excellent connectivity and infrastructure.",
      features: ["Water Connection", "Electricity", "Road Access", "Sewage System"],
      registrationDate: "2024-01-15",
      lastTransaction: "2024-01-15",
    },
    LAND002: {
      id: "LAND002",
      title: "Commercial Development Land",
      location: "Business Park, Tech Valley",
      area: "5,000 sq ft",
      price: "$850,000",
      owner: "0x8ba1f109551bD432803012645Hac136c30c6213c",
      status: "Verified",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      description: "Ideal for commercial development with high foot traffic and excellent visibility.",
      features: ["Commercial Zoning", "Parking Space", "Metro Access", "High-Speed Internet"],
      registrationDate: "2024-02-20",
      lastTransaction: "2024-02-20",
    },
    LAND003: {
      id: "LAND003",
      title: "Agricultural Farmland",
      location: "Green Valley, Rural County",
      area: "10,000 sq ft",
      price: "$120,000",
      owner: "0x1234567890abcdef1234567890abcdef12345678",
      status: "Pending Verification",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      description: "Fertile agricultural land perfect for farming with natural water sources.",
      features: ["Fertile Soil", "Water Source", "Farm Equipment Access", "Organic Certified"],
      registrationDate: "2024-03-10",
      lastTransaction: "2024-03-10",
    },
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call delay
    setTimeout(() => {
      const property = mockProperties[searchQuery.toUpperCase()]
      setSearchResults(property || null)
      setIsSearching(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults(null)
  }

  const handlePropertySelect = (property) => {
    setSearchResults(property)
    setSearchQuery(property.id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Property Search</h1>
        <p className="text-muted-foreground">
          Search for properties by Land ID and explore detailed information with our advanced mapping system
        </p>
      </div>

      {/* Search Interface */}
      <Card className="mb-8 shadow-lg border-0 bg-gradient-to-r from-card to-card/50">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter Land ID (e.g., LAND001, LAND002, LAND003)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-4 pr-4 py-3 text-lg border-2 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </div>
              ) : (
                "Search Property"
              )}
            </Button>

            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-4"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "3d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("3d")}
                className="px-4"
              >
                3D View
              </Button>
            </div>
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Try searching:</span>
            {Object.keys(mockProperties).map((landId) => (
              <Button
                key={landId}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery(landId)
                  setTimeout(() => handleSearch(), 100)
                }}
                className="text-xs"
              >
                {landId}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Property Details</h2>
            <Button variant="outline" onClick={clearSearch}>
              Clear Search
            </Button>
          </div>

          {viewMode === "grid" ? (
            <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground mb-2">{searchResults.title}</CardTitle>
                    <p className="text-muted-foreground flex items-center">{searchResults.location}</p>
                  </div>
                  <Badge
                    variant={searchResults.status === "Verified" ? "default" : "secondary"}
                    className={searchResults.status === "Verified" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {searchResults.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{searchResults.description}</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Land ID</h4>
                    <p className="text-sm text-muted-foreground font-mono">{searchResults.id}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Area</h4>
                    <p className="text-sm text-muted-foreground">{searchResults.area}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Price</h4>
                    <p className="text-sm text-accent font-semibold">{searchResults.price}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Registration</h4>
                    <p className="text-sm text-muted-foreground">{searchResults.registrationDate}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Owner Information</h4>
                    <p className="text-sm text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg">
                      {searchResults.owner}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Property Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchResults.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Location Coordinates</h4>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Latitude: {searchResults.coordinates.lat} | Longitude: {searchResults.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View on Map</Button>
                  <Button variant="outline">Download Report</Button>
                  <Button variant="outline">Share Property</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <SatelliteMapView searchResults={searchResults} onPropertySelect={handlePropertySelect} />
          )}
        </div>
      )}

      {!searchResults && viewMode === "3d" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">3D Satellite Map View</h2>
            <Button variant="outline" onClick={() => setViewMode("grid")}>
              Switch to Grid View
            </Button>
          </div>
          <SatelliteMapView onPropertySelect={handlePropertySelect} />
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults === null && !isSearching && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-muted-foreground">?</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Property Found</h3>
            <p className="text-muted-foreground mb-4">
              No property found with Land ID "{searchQuery}". Please check the ID and try again.
            </p>
            <Button variant="outline" onClick={clearSearch}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Default State - No Search */}
      {!searchQuery && !searchResults && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary">SEARCH</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Search for Properties</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Enter a Land ID in the search bar above to find detailed property information and view it in grid or 3D
              satellite mode.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Available: LAND001
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Available: LAND002
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                Available: LAND003
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
