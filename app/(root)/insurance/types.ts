export interface VehicleInsuranceData {
  id: string
  vehicleId: string
  plateNumber: string
  ownerName: string
  planId: string
  planName: "BASIC" | "PREMIUM"
  dailyCost: number
  monthlyCost: number
  coverage: string[]
  isActive: boolean
  isEligible: boolean
  totalDaysPaid: number
  enrollmentDate: string
  lastPaymentDate?: string
  eligibilityDate?: string
  lgaName: string
  lgaId: string
}

export interface InsuranceResponse {
  success: boolean
  message: string
  data: VehicleInsuranceData[]
  meta: {
    page: number
    limit: number
    count: number
    totalPages: number
  }
}

export interface FetchInsuranceParams {
  page: number
  limit: number
  search: string
  plan: string
  status: string
  eligibility: string
  lgaId: string
}

export interface InsuranceClaim {
  id: string
  claimNumber: string
  vehicleId: string
  plateNumber: string
  claimType: "FIRE" | "THEFT" | "ACCIDENT" | "OTHER"
  description: string
  incidentDate: string
  reportedDate: string
  claimAmount?: number
  approvedAmount?: number
  status: "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "PAID"
  documents: string[]
  notes?: string
}
