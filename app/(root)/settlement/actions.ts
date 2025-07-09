import type { SettlementsResponse, FetchSettlementsParams } from "./types"

// Mock data - replace with actual API call
const mockSettlements = [
  {
    id: "sett_001",
    lgaId: "lga_001",
    lgaName: "Amuwo Odofin",
    totalAmount: 2450000,
    stateShare: 980000,
    irsShare: 612500,
    lgaShare: 490000,
    isceShare: 367500,
    statePercentage: 40,
    irsPercentage: 25,
    lgaPercentage: 20,
    iscePercentage: 15,
    status: "COMPLETED" as const,
    transactionCount: 156,
    settlementDate: "2025-01-15T10:00:00.000Z",
    createdAt: "2025-01-15T10:00:00.000Z",
    updatedAt: "2025-01-15T10:30:00.000Z",
    processedBy: "system",
    reference: "SETT-2025-001",
    description: "Monthly settlement for January 2025",
  },
  {
    id: "sett_002",
    lgaId: "lga_002",
    lgaName: "Lagos Island",
    totalAmount: 3200000,
    stateShare: 1280000,
    irsShare: 800000,
    lgaShare: 640000,
    isceShare: 480000,
    statePercentage: 40,
    irsPercentage: 25,
    lgaPercentage: 20,
    iscePercentage: 15,
    status: "PENDING" as const,
    transactionCount: 203,
    settlementDate: "2025-01-15T10:00:00.000Z",
    createdAt: "2025-01-15T09:00:00.000Z",
    updatedAt: "2025-01-15T09:00:00.000Z",
    reference: "SETT-2025-002",
    description: "Monthly settlement for January 2025",
  },
  {
    id: "sett_003",
    lgaId: "lga_003",
    lgaName: "Ikeja",
    totalAmount: 1800000,
    stateShare: 720000,
    irsShare: 450000,
    lgaShare: 360000,
    isceShare: 270000,
    statePercentage: 40,
    irsPercentage: 25,
    lgaPercentage: 20,
    iscePercentage: 15,
    status: "FAILED" as const,
    transactionCount: 89,
    settlementDate: "2025-01-15T10:00:00.000Z",
    createdAt: "2025-01-15T08:00:00.000Z",
    updatedAt: "2025-01-15T08:30:00.000Z",
    reference: "SETT-2025-003",
    description: "Monthly settlement for January 2025",
  },
]

export async function fetchSettlements({
  page,
  limit,
  dateFrom,
  dateTo,
  lgaId,
  status,
  period,
}: FetchSettlementsParams): Promise<SettlementsResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Filter settlements based on search params
  let filteredSettlements = [...mockSettlements]

  if (lgaId) {
    filteredSettlements = filteredSettlements.filter((settlement) => settlement.lgaId === lgaId)
  }

  if (status) {
    filteredSettlements = filteredSettlements.filter((settlement) => settlement.status === status)
  }

  if (dateFrom) {
    filteredSettlements = filteredSettlements.filter(
      (settlement) => new Date(settlement.createdAt) >= new Date(dateFrom),
    )
  }

  if (dateTo) {
    filteredSettlements = filteredSettlements.filter((settlement) => new Date(settlement.createdAt) <= new Date(dateTo))
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedSettlements = filteredSettlements.slice(startIndex, endIndex)

  return {
    success: true,
    message: "Settlements retrieved successfully",
    data: paginatedSettlements,
    meta: {
      page,
      limit,
      count: filteredSettlements.length,
      totalPages: Math.ceil(filteredSettlements.length / limit),
    },
  }
}
