export interface Settlement {
  id: string
  lgaId: string
  lgaName: string
  totalAmount: number
  stateShare: number
  irsShare: number
  lgaShare: number
  isceShare: number
  statePercentage: number
  irsPercentage: number
  lgaPercentage: number
  iscePercentage: number
  status: "PENDING" | "COMPLETED" | "FAILED"
  transactionCount: number
  settlementDate: string
  createdAt: string
  updatedAt: string
  processedBy?: string
  reference: string
  description?: string
}

export interface SettlementsResponse {
  success: boolean
  message: string
  data: Settlement[]
  meta: {
    page: number
    limit: number
    count: number
    totalPages: number
  }
}

export interface FetchSettlementsParams {
  page: number
  limit: number
  dateFrom: string
  dateTo: string
  lgaId: string
  status: string
  period: string
}

export interface SettlementConfig {
  id: string
  statePercentage: number
  irsPercentage: number
  lgaPercentage: number
  iscePercentage: number
  updatedAt: string
  updatedBy: string
}

export interface SettlementConfigResponse {
  success: boolean
  message: string
  data: SettlementConfig
}
