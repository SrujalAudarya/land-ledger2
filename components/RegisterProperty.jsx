"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription } from "./ui/alert"

export default function RegisterProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    area: "",
    price: "",
    propertyType: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    features: [],
    documents: [],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [currentFeature, setCurrentFeature] = useState("")

  const propertyTypes = ["Residential", "Commercial", "Agricultural", "Industrial", "Mixed Use", "Vacant Land"]

  const commonFeatures = [
    "Water Connection",
    "Electricity",
    "Road Access",
    "Sewage System",
    "Internet Connectivity",
    "Parking Space",
    "Security",
    "Garden/Landscaping",
  ]

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const addFeature = (feature) => {
    if (feature && !formData.features.includes(feature)) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }))
      setCurrentFeature("")
    }
  }

  const removeFeature = (featureToRemove) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Validate required fields
    const requiredFields = ["title", "location", "area", "price", "propertyType"]
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      setSubmitStatus({
        type: "error",
        message: `Please fill in all required fields: ${missingFields.join(", ")}`,
      })
      setIsSubmitting(false)
      return
    }

    // Simulate blockchain transaction
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate a mock transaction hash and land ID
      const transactionHash = "0x" + Math.random().toString(16).substr(2, 64)
      const landId = "LAND" + String(Math.floor(Math.random() * 1000) + 1).padStart(3, "0")

      setSubmitStatus({
        type: "success",
        message: "Property successfully registered on blockchain!",
        transactionHash,
        landId,
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        area: "",
        price: "",
        propertyType: "",
        coordinates: { latitude: "", longitude: "" },
        features: [],
        documents: [],
      })
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to register property. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return formData.title && formData.location && formData.area && formData.price && formData.propertyType
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Register New Property</h1>
        <p className="text-muted-foreground">
          Register your property on the blockchain for secure, transparent, and immutable ownership records
        </p>
      </div>

      {/* Registration Form */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Property Information</CardTitle>
              <p className="text-muted-foreground">Fill in the details below to register your property</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Basic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium text-foreground">
                        Property Title *
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="e.g., Premium Residential Plot"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        className="border-2 border-border focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType" className="text-sm font-medium text-foreground">
                        Property Type *
                      </Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) => handleInputChange("propertyType", value)}
                      >
                        <SelectTrigger className="border-2 border-border focus:border-primary">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium text-foreground">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      placeholder="e.g., Downtown District, Metro City"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-2 border-border focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-foreground">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your property in detail..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="border-2 border-border focus:border-primary transition-colors min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Property Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="area" className="text-sm font-medium text-foreground">
                        Area *
                      </Label>
                      <Input
                        id="area"
                        type="text"
                        placeholder="e.g., 2,500 sq ft"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        className="border-2 border-border focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-foreground">
                        Price *
                      </Label>
                      <Input
                        id="price"
                        type="text"
                        placeholder="e.g., $450,000"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="border-2 border-border focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Coordinates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">GPS Coordinates</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latitude" className="text-sm font-medium text-foreground">
                        Latitude
                      </Label>
                      <Input
                        id="latitude"
                        type="text"
                        placeholder="e.g., 40.7128"
                        value={formData.coordinates.latitude}
                        onChange={(e) => handleInputChange("coordinates.latitude", e.target.value)}
                        className="border-2 border-border focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="longitude" className="text-sm font-medium text-foreground">
                        Longitude
                      </Label>
                      <Input
                        id="longitude"
                        type="text"
                        placeholder="e.g., -74.0060"
                        value={formData.coordinates.longitude}
                        onChange={(e) => handleInputChange("coordinates.longitude", e.target.value)}
                        className="border-2 border-border focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Property Features
                  </h3>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Add custom feature..."
                        value={currentFeature}
                        onChange={(e) => setCurrentFeature(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature(currentFeature))}
                        className="flex-1 border-2 border-border focus:border-primary transition-colors"
                      />
                      <Button
                        type="button"
                        onClick={() => addFeature(currentFeature)}
                        disabled={!currentFeature}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {commonFeatures.map((feature) => (
                        <Button
                          key={feature}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addFeature(feature)}
                          disabled={formData.features.includes(feature)}
                          className="text-xs"
                        >
                          {feature}
                        </Button>
                      ))}
                    </div>

                    {formData.features.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-foreground">Selected Features:</Label>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map((feature, index) => (
                            <Badge
                              key={index}
                              variant="default"
                              className="bg-primary/10 text-primary border-primary/20 cursor-pointer hover:bg-primary/20"
                              onClick={() => removeFeature(feature)}
                            >
                              {feature}
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <Alert
                    className={
                      submitStatus.type === "error"
                        ? "border-destructive/50 text-destructive"
                        : "border-accent/50 text-accent"
                    }
                  >
                    <AlertDescription>
                      {submitStatus.message}
                      {submitStatus.transactionHash && (
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <strong>Land ID:</strong> {submitStatus.landId}
                          </p>
                          <p className="text-sm font-mono">
                            <strong>Transaction Hash:</strong> {submitStatus.transactionHash}
                          </p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <div className="pt-6 border-t border-border">
                  <Button
                    type="submit"
                    disabled={!isFormValid() || isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white py-3 text-lg shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Registering on Blockchain...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <span>Register Property on Blockchain</span>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Information Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Why Register on Blockchain?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Immutable Records</h4>
                  <p className="text-xs text-muted-foreground">
                    Your property ownership is permanently recorded and cannot be altered
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Enhanced Security</h4>
                  <p className="text-xs text-muted-foreground">
                    Cryptographic security prevents fraud and unauthorized changes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Instant Verification</h4>
                  <p className="text-xs text-muted-foreground">
                    Anyone can verify ownership instantly without intermediaries
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">Global Access</h4>
                  <p className="text-xs text-muted-foreground">
                    Access your property records from anywhere in the world
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Registration Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  1
                </div>
                <p className="text-sm text-muted-foreground">Fill in property details</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  2
                </div>
                <p className="text-sm text-muted-foreground">Submit to blockchain</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                  3
                </div>
                <p className="text-sm text-muted-foreground">Receive Land ID & transaction hash</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs font-bold">
                  ✓
                </div>
                <p className="text-sm text-muted-foreground">Property registered successfully</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Required Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Property title and type</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Complete location address</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>Area and price information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>GPS coordinates (optional)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Property features (optional)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
