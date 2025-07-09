import type { InsuranceResponse, FetchInsuranceParams } from "./types"

// Mock data - replace with actual API call
const mockInsuranceData = [
  {
    id: "ins_001",
    vehicleId: "veh_001",
    plateNumber: "ABC-123-XY",
    ownerName: "John Doe Transport",
    planId: "plan_basic",
    planName: "BASIC" as const,
    dailyCost: 100,
    monthlyCost: 3000,
    coverage: ["Fire", "Theft"],
    isActive: true,
    isEligible: true,
    totalDaysPaid: 95,
    enrollmentDate: "2024-10-01T00:00:00.000Z",
    lastPaymentDate: "2025-01-14T00:00:00.000Z",
    eligibilityDate: "2024-12-30T00:00:00.000Z",
    lgaName: "Amuwo Odofin",
    lgaId: "lga_001",
  },
  {
    id: "ins_002",
    vehicleId: "veh_002",
    plateNumber: "DEF-456-ZA",
    ownerName: "Sarah Johnson",
    planId: "plan_premium",
    planName: "PREMIUM" as const,
    dailyCost: 200,
    monthlyCost: 6000,
    coverage: ["Fire", "Theft", "Accident"],
    isActive: true,
    isEligible: false,
    totalDaysPaid: 45,
    enrollmentDate: "2024-12-01T00:00:00.000Z",
    lastPaymentDate: "2025-01-13T00:00:00.000Z",
    lgaName: "Lagos Island",
    lgaId: "lga_002",
  },
  {
    id: "ins_003",
    vehicleId: "veh_003",
    plateNumber: "GHI-789-BC",
    ownerName: "Mike's Logistics",
    planId: "plan_basic",
    planName: "BASIC" as const,
    dailyCost: 100,
    monthlyCost: 3000,
    coverage: ["Fire", "Theft"],
    isActive: true,
    isEligible: true,
    totalDaysPaid: 120,
    enrollmentDate: "2024-08-15T00:00:00.000Z",
    lastPaymentDate: "2025-01-14T00:00:00.000Z",
    eligibilityDate: "2024-11-13T00:00:00.000Z",
    lgaName: "Ikeja",
    lgaId: "lga_003",
  },
  {
    id: "ins_004",
    vehicleId: "veh_004",
    plateNumber: "JKL-012-DE",
    ownerName: "Express Delivery Co",
    planId: "plan_premium",
    planName: "PREMIUM" as const,
    dailyCost: 200,
    monthlyCost: 6000,
    coverage: ["Fire", "Theft", "Accident"],
    isActive: false,
    isEligible: false,
    totalDaysPaid: 15,
    enrollmentDate: "2025-01-01T00:00:00.000Z",
    lastPaymentDate: "2025-01-10T00:00:00.000Z",
    lgaName: "Surulere",
    lgaId: "lga_004",
  },
]

export async function fetchInsuranceData({
  page,
  limit,
  search,
  plan,
  status,
  eligibility,
  lgaId,
}: FetchInsuranceParams): Promise<InsuranceResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter data based on search params
  let filteredData = [...mockInsuranceData]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredData = filteredData.filter(
      (item) =>
        item.plateNumber.toLowerCase().includes(searchLower) || item.ownerName.toLowerCase().includes(searchLower),
    )
  }

  if (plan && plan !== "ALL_PLANS") {
    filteredData = filteredData.filter((item) => item.planName === plan)
  }

  if (status && status !== "ALL_STATUS") {
    const isActive = status === "ACTIVE"
    filteredData = filteredData.filter((item) => item.isActive === isActive)
  }

  if (eligibility && eligibility !== "ALL_ELIGIBILITY") {
    const isEligible = eligibility === "ELIGIBLE"
    filteredData = filteredData.filter((item) => item.isEligible === isEligible)
  }

  if (lgaId && lgaId !== "ALL_LGAS") {
    filteredData = filteredData.filter((item) => item.lgaId === lgaId)
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = filteredData.slice(startIndex, endIndex)

  return {
    success: true,
    message: "Insurance data retrieved successfully",
    data: paginatedData,
    meta: {
      page,
      limit,
      count: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
    },
  }
}
