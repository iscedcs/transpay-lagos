"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, AlertCircle } from "lucide-react"
import type { ScanLocation } from "@/types/scan"

interface LocationGateProps {
  onLocationGranted: (location: ScanLocation) => void
}

export function LocationGate({ onLocationGranted }: LocationGateProps) {
  const [status, setStatus] = useState<"checking" | "denied" | "granted" | "error">("checking")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    checkLocationPermission()
  }, [])

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setStatus("error")
      setError("Geolocation is not supported by this browser")
      return
    }

    try {
      const permission = await navigator.permissions.query({ name: "geolocation" })

      if (permission.state === "granted") {
        getCurrentLocation()
      } else if (permission.state === "denied") {
        setStatus("denied")
      } else {
        // Prompt for permission
        requestLocation()
      }
    } catch (err) {
      // Fallback for browsers that don't support permissions API
      requestLocation()
    }
  }

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: ScanLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        setStatus("granted")
        onLocationGranted(location)
      },
      (error) => {
        setStatus("denied")
        setError(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: ScanLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        setStatus("granted")
        onLocationGranted(location)
      },
      (error) => {
        setStatus("error")
        setError(error.message)
      },
    )
  }

  if (status === "granted") {
    return null // Location granted, hide this component
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <MapPin className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>Location Access Required</CardTitle>
          <CardDescription>Enable device location to begin vehicle scanning</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "checking" && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Checking location permissions...</p>
            </div>
          )}

          {status === "denied" && (
            <>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">
                  Location access was denied. Please enable location in your browser settings.
                </p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium">To enable location:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Click the location icon in your browser's address bar</li>
                  <li>Select "Allow" for location access</li>
                  <li>Refresh this page</li>
                </ol>
              </div>
              <Button onClick={() => window.location.reload()} className="w-full">
                Refresh Page
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button onClick={checkLocationPermission} className="w-full">
                Try Again
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
