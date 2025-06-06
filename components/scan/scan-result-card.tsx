"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, MapPin, User, Car, Route } from "lucide-react"
import type { ScanResponse, ScanLocation } from "@/types/scan"

interface ScanResultCardProps {
  result: ScanResponse
  scanLocation: ScanLocation
  onNewScan: () => void
  onReportIssue: () => void
}

export function ScanResultCard({ result, scanLocation, onNewScan, onReportIssue }: ScanResultCardProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  const { vehicle, violation } = result

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "non_compliant":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "grace_period":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800"
      case "non_compliant":
        return "bg-red-100 text-red-800"
      case "grace_period":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmTLu4_iW5B9MWmkvJ5raMJDWFt1hjP7Y&libraries=geometry`
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)
    } else {
      setMapLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (mapLoaded) {
      initializeMap()
    }
  }, [mapLoaded])

  const initializeMap = () => {
    const mapElement = document.getElementById("scan-result-map")
    if (!mapElement || !window.google) return

    const map = new window.google.maps.Map(mapElement, {
      center: { lat: scanLocation.latitude, lng: scanLocation.longitude },
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    })

    // Add marker for scan location
    new window.google.maps.Marker({
      position: { lat: scanLocation.latitude, lng: scanLocation.longitude },
      map: map,
      title: "Scan Location",
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3B82F6"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(24, 24),
      },
    })

    // Highlight current LGA area (mock polygon)
    if (vehicle.routeInfo) {
      const lgaPolygon = new window.google.maps.Polygon({
        paths: [
          { lat: scanLocation.latitude + 0.01, lng: scanLocation.longitude + 0.01 },
          { lat: scanLocation.latitude + 0.01, lng: scanLocation.longitude - 0.01 },
          { lat: scanLocation.latitude - 0.01, lng: scanLocation.longitude - 0.01 },
          { lat: scanLocation.latitude - 0.01, lng: scanLocation.longitude + 0.01 },
        ],
        strokeColor: vehicle.routeInfo.isOnRoute ? "#10B981" : "#EF4444",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: vehicle.routeInfo.isOnRoute ? "#10B981" : "#EF4444",
        fillOpacity: 0.2,
      })
      lgaPolygon.setMap(map)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(vehicle.status)}
                {vehicle.plateNumber}
              </CardTitle>
              <CardDescription>
                {vehicle.category} • {vehicle.type}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(vehicle.status)}>{vehicle.status.replace("_", " ").toUpperCase()}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vehicle Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Owner</p>
                <p className="text-sm text-muted-foreground">{vehicle.ownerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{vehicle.category}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Route Information */}
          {vehicle.routeInfo && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Route Information</p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Assigned LGAs: </span>
                  <span>{vehicle.routeInfo.assignedLgas.join(", ")}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Current LGA: </span>
                  <span>{vehicle.routeInfo.currentLga}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Route Status: </span>
                  {vehicle.routeInfo.isOnRoute ? (
                    <Badge className="bg-green-100 text-green-800">On Route</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Off Route</Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Map */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Scan Location</p>
            </div>
            <div id="scan-result-map" className="w-full h-48 bg-gray-100 rounded-lg">
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={onNewScan} className="flex-1">
              Scan Another Vehicle
            </Button>
            <Button onClick={onReportIssue} variant="outline">
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
