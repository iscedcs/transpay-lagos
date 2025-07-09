import type { InsuranceClaim } from "../insurance/types"

interface InsuranceCompanyResponse {
  success: boolean
  message: string
  data: InsuranceClaim[]
  meta: {
    page: number
    limit: number
    count: number
    totalPages: number
  }
}

interface FetchInsuranceCompanyParams {
  page: number
  limit: number
  search: string
  status: string
  claimType: string
}

// Mock data - replace with actual API call
const mockClaimsData: InsuranceClaim[] = [
  {
    id: "claim_001",
    claimNumber: "CLM-2025-001",
    vehicleId: "veh_001",
    plateNumber: "ABC-123-XY",
    claimType: "ACCIDENT",
    description: "Vehicle involved in a collision at Third Mainland Bridge. Front bumper and headlights damaged.",
    incidentDate: "2025-01-10T14:30:00.000Z",
    reportedDate: "2025-01-10T16:45:00.000Z",
    claimAmount: 450000,
    approvedAmount: 400000,
    status: "APPROVED",
    documents: ["incident_report.pdf", "photos_1.jpg", "photos_2.jpg", "police_report.pdf"],
    notes: "Approved with minor reduction due to wear and tear assessment",
  },
  {
    id: "claim_002",
    claimNumber: "CLM-2025-002",
    vehicleId: "veh_002",
    plateNumber: "DEF-456-ZA",
    claimType: "THEFT",
    description: "Vehicle stolen from parking lot at Victoria Island. All documents and spare key taken.",
    incidentDate: "2025-01-12T22:00:00.000Z",
    reportedDate: "2025-01-13T08:30:00.000Z",
    claimAmount: 2500000,
    status: "PENDING",
    documents: ["police_report.pdf", "parking_receipt.jpg"],
    notes: "Awaiting police investigation completion",
  },
  {
    id: "claim_003",
    claimNumber: "CLM-2025-003",
    vehicleId: "veh_003",
    plateNumber: "GHI-789-BC",
    claimType: "FIRE",
    description: "Engine fire due to electrical fault. Significant damage to engine bay and cabin.",
    incidentDate: "2025-01-08T11:15:00.000Z",
    reportedDate: "2025-01-08T12:00:00.000Z",
    claimAmount: 1800000,
    approvedAmount: 1650000,
    status: "PAID",
    documents: ["fire_report.pdf", "damage_assessment.pdf", "photos.zip"],
    notes: "Payment processed successfully",
  },
  {
    id: "claim_004",
    claimNumber: "CLM-2025-004",
    vehicleId: "veh_004",
    plateNumber: "JKL-012-DE",
    claimType: "ACCIDENT",
    description: "Minor fender bender in parking lot. Rear bumper scratched.",
    incidentDate: "2025-01-14T09:45:00.000Z",
    reportedDate: "2025-01-14T10:30:00.000Z",
    claimAmount: 85000,
    status: "REJECTED",
    documents: ["photos.jpg"],
    notes: "Damage assessment shows pre-existing wear. Claim rejected.",
  },
  {
    id: "claim_005",
    claimNumber: "CLM-2025-005",
    vehicleId: "veh_005",
    plateNumber: "MNO-345-FG",
    claimType: "THEFT",
    description: "Side mirror and radio stolen while parked overnight.",
    incidentDate: "2025-01-13T02:00:00.000Z",
    reportedDate: "2025-01-13T07:30:00.000Z",
    claimAmount: 120000,
    status: "UNDER_REVIEW",
    documents: ["police_report.pdf", "photos.jpg"],
    notes: "Under review by claims assessor",
  },
]

export async function fetchInsuranceCompanyData({
  page,
  limit,
  search,
  status,
  claimType,
}: FetchInsuranceCompanyParams): Promise<InsuranceCompanyResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter data based on search params
  let filteredData = [...mockClaimsData]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredData = filteredData.filter(
      (claim) =>
        claim.claimNumber.toLowerCase().includes(searchLower) ||
        claim.plateNumber.toLowerCase().includes(searchLower) ||
        claim.description.toLowerCase().includes(searchLower),
    )
  }

  if (status && status !== "ALL_STATUS") {
    filteredData = filteredData.filter((claim) => claim.status === status)
  }

  if (claimType && claimType !== "ALL_TYPES") {
    filteredData = filteredData.filter((claim) => claim.claimType === claimType)
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = filteredData.slice(startIndex, endIndex)

  return {
    success: true,
    message: "Insurance company claims retrieved successfully",
    data: paginatedData,
    meta: {
      page,
      limit,
      count: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
    },
  }
}
