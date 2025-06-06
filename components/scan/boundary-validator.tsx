"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, MapPin } from "lucide-react"
import { toast } from "sonner"
import type { ScanLocation, UnblockRequest } from "@/types/scan"
import { requestUnblock } from "@/lib/scan-data"

interface BoundaryValidatorProps {
  location: ScanLocation
  assignedLgaPolygon: any // GeoJSON polygon
  assignedLgaName: string
  onValidationComplete: (isValid: boolean) => void
}

export function BoundaryValidator({
  location,
  assignedLgaPolygon,
  assignedLgaName,
  onValidationComplete,
}: BoundaryValidatorProps) {
  const [isValidating, setIsValidating] = useState(true)
  const [isInsideBoundary, setIsInsideBoundary] = useState(false)
  const [showUnblockForm, setShowUnblockForm] = useState(false)
  const [unblockReason, setUnblockReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    validateBoundary()
  }, [location, assignedLgaPolygon])

  const validateBoundary = () => {
    setIsValidating(true)

    // Simulate boundary validation using turf.booleanPointInPolygon
    // In real implementation, you would use:
    // import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon'
    // const point = turf.point([location.longitude, location.latitude])
    // const isInside = booleanPointInPolygon(point, assignedLgaPolygon)

    // Mock validation - assume user is inside for demo
    const isInside = Math.random() > 0.3 // 70% chance of being inside

    setTimeout(() => {
      setIsInsideBoundary(isInside)
      setIsValidating(false)
      onValidationComplete(isInside)
    }, 1000)
  }

  const handleUnblockRequest = async () => {
    if (!unblockReason.trim()) {
      toast.error("Please provide a reason for the unblock request")
      return
    }

    setIsSubmitting(true)
    try {
      const request: UnblockRequest = {
        reason: unblockReason,
        currentLocation: location,
        requestedLga: assignedLgaName,
      }

      const response = await requestUnblock(request)

      if (response.success) {
        toast.success(response.message)
        setShowUnblockForm(false)
      }
    } catch (error) {
      toast.error("Failed to submit unblock request")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isValidating) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-sm text-muted-foreground">Validating your location within {assignedLgaName}...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isInsideBoundary) {
    return null // User is inside boundary, hide this component
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>Outside Assigned Area</CardTitle>
          <CardDescription>You are currently outside your assigned LGA: {assignedLgaName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
            <MapPin className="h-4 w-4 text-red-600" />
            <div className="text-sm">
              <p className="font-medium text-red-700">Location Restricted</p>
              <p className="text-red-600">Vehicle scanning is blocked outside your assigned area</p>
            </div>
          </div>

          {!showUnblockForm ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                If you need to scan vehicles outside your assigned area, you can request temporary access.
              </p>
              <Button onClick={() => setShowUnblockForm(true)} className="w-full" variant="outline">
                Request Temporary Access
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Reason for Access Request</label>
                <Textarea
                  placeholder="Please explain why you need to scan vehicles outside your assigned area..."
                  value={unblockReason}
                  onChange={(e) => setUnblockReason(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowUnblockForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleUnblockRequest} disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
