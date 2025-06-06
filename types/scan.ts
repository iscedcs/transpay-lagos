export interface ScanLocation {
  latitude: number
  longitude: number
}

export interface ScanRequest {
  vehicleId: string
  latitude: number
  longitude: number
}

export interface ScanResponse {
  success: boolean
  vehicle: {
    id: string
    plateNumber: string
    category: string
    type: string
    ownerName: string
    status: "compliant" | "non_compliant" | "grace_period"
    routeInfo?: {
      assignedLgas: string[]
      currentLga: string
      isOnRoute: boolean
    }
  }
  violation?: {
    type: "out_of_route" | "expired_registration" | "unpaid_levy"
    message: string
    levyCharged?: number
  }
}

export interface UnblockRequest {
  reason: string
  currentLocation: ScanLocation
  requestedLga: string
}

export interface ReportIssue {
  vehicleId: string
  issueType: "damaged_sticker" | "fake_sticker" | "suspicious_activity" | "other"
  description: string
  location: ScanLocation
  images?: File[]
}
