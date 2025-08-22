"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function SatelliteMapView({ searchResults, onPropertySelect }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoomLevel, setZoomLevel] = useState(12)

  // Hardcoded properties for the satellite map
  const mapProperties = [
    {
      id: "LAND001",
      title: "Premium Residential Plot",
      location: "Downtown District",
      price: "$450,000",
      status: "Verified",
      coordinates: { lat: 40.7128, lng: -74.006 },
      area: "2,500 sq ft",
      owner: "0x742d35Cc...5b8c",
    },
    {
      id: "LAND002",
      title: "Commercial Development Land",
      location: "Business Park",
      price: "$850,000",
      status: "Verified",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      area: "5,000 sq ft",
      owner: "0x8ba1f109...213c",
    },
    {
      id: "LAND003",
      title: "Agricultural Farmland",
      location: "Green Valley",
      price: "$120,000",
      status: "Pending",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      area: "10,000 sq ft",
      owner: "0x1234567...5678",
    },
    {
      id: "LAND004",
      title: "Waterfront Property",
      location: "Harbor District",
      price: "$1,200,000",
      status: "Verified",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      area: "3,200 sq ft",
      owner: "0xabcdef12...9876",
    },
    {
      id: "LAND005",
      title: "Industrial Plot",
      location: "Manufacturing Zone",
      price: "$680,000",
      status: "Verified",
      coordinates: { lat: 40.6782, lng: -73.9442 },
      area: "8,000 sq ft",
      owner: "0x9876543...abcd",
    },
  ]

  const handlePropertyClick = (property) => {
    setSelectedProperty(property)
    setMapCenter(property.coordinates)
    setZoomLevel(16)
    if (onPropertySelect) {
      onPropertySelect(property)
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 2, 20))
  }

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 2, 8))
  }

  const resetView = () => {
    setMapCenter({ lat: 40.7128, lng: -74.006 })
    setZoomLevel(12)
    setSelectedProperty(null)
  }

  const getPropertyMarkerStyle = (property) => {
    const isSelected = selectedProperty?.id === property.id
    const isHighlighted = searchResults?.id === property.id

    if (isSelected || isHighlighted) {
      return "bg-accent text-accent-foreground border-2 border-accent shadow-lg scale-110"
    }

    return property.status === "Verified"
      ? "bg-primary text-primary-foreground border-2 border-primary/50 hover:scale-105"
      : "bg-secondary text-secondary-foreground border-2 border-secondary/50 hover:scale-105"
  }

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Interactive Satellite Map</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Zoom Level: {zoomLevel}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" onClick={resetView}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Satellite Map Container */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/50 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 overflow-hidden">
            {/* Satellite Map Background */}
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 40% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)
                `,
                backgroundSize: "100% 100%, 80% 80%, 60% 60%, 100% 100%",
              }}
            />

            {/* Grid Lines for Satellite Effect */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Property Markers */}
            {mapProperties.map((property, index) => {
              const x = ((property.coordinates.lng + 74.1) * 800) % 100
              const y = ((40.8 - property.coordinates.lat) * 800) % 100

              return (
                <div
                  key={property.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${getPropertyMarkerStyle(property)}`}
                  style={{
                    left: `${15 + x * 0.7}%`,
                    top: `${15 + y * 0.7}%`,
                  }}
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                    {property.id.slice(-1)}
                  </div>

                  {/* Property Label */}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg min-w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-xs font-semibold text-foreground">{property.title}</p>
                    <p className="text-xs text-muted-foreground">{property.price}</p>
                  </div>
                </div>
              )
            })}

            {/* Satellite Overlay Effects */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span>Live Satellite View</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Lat: {mapCenter.lat.toFixed(4)}, Lng: {mapCenter.lng.toFixed(4)}
              </p>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
              <h4 className="text-xs font-semibold text-foreground mb-2">Property Status</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Selected</span>
                </div>
              </div>
            </div>

            {/* Scale Indicator */}
            <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-foreground"></div>
                <span className="text-xs text-muted-foreground">
                  {zoomLevel > 15 ? "100m" : zoomLevel > 12 ? "500m" : "1km"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Property Details */}
      {selectedProperty && (
        <Card className="shadow-lg border-0 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-foreground">{selectedProperty.title}</CardTitle>
                <p className="text-muted-foreground">{selectedProperty.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={selectedProperty.status === "Verified" ? "default" : "secondary"}
                  className={selectedProperty.status === "Verified" ? "bg-accent text-accent-foreground" : ""}
                >
                  {selectedProperty.status}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setSelectedProperty(null)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-semibold text-foreground text-sm mb-1">Land ID</h4>
                <p className="text-sm text-muted-foreground font-mono">{selectedProperty.id}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-semibold text-foreground text-sm mb-1">Area</h4>
                <p className="text-sm text-muted-foreground">{selectedProperty.area}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-semibold text-foreground text-sm mb-1">Price</h4>
                <p className="text-sm text-accent font-semibold">{selectedProperty.price}</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-semibold text-foreground text-sm mb-1">Owner</h4>
                <p className="text-sm text-muted-foreground font-mono">{selectedProperty.owner}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View Full Details
              </Button>
              <Button variant="outline" size="sm">
                Contact Owner
              </Button>
              <Button variant="outline" size="sm">
                Schedule Visit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Property List */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Available Properties</CardTitle>
          <p className="text-sm text-muted-foreground">Click on any property marker on the map to view details</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mapProperties.map((property) => (
              <div
                key={property.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedProperty?.id === property.id
                    ? "bg-accent/10 border-accent"
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
                onClick={() => handlePropertyClick(property)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-sm">{property.title}</h4>
                  <Badge
                    variant={property.status === "Verified" ? "default" : "secondary"}
                    className={`text-xs ${property.status === "Verified" ? "bg-primary/10 text-primary" : ""}`}
                  >
                    {property.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{property.location}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-accent">{property.price}</span>
                  <span className="text-xs text-muted-foreground">{property.area}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
