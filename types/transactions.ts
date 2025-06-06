export interface Transaction {
  id: string
  reference: string
  vehicleId: string
  vehiclePlateNumber: string
  amount: number
  type: "payment" | "fee" | "fine" | "route_fee" | "refund"
  status: "success" | "failed" | "pending"
  lgaId: string
  lgaName: string
  stateId: string
  stateName: string
  timestamp: string
  channel: "wallet" | "pos" | "bank_transfer" | "cash"
  collectedBy?: string
  collectedByName?: string
  description?: string
  metadata?: Record<string, any>
}

export interface TransactionFilters {
  dateRange?: {
    from: string
    to: string
  }
  type?: string
  status?: string
  stateId?: string
  lgaId?: string
  search?: string
  page?: number
  limit?: number
  sortBy?: "timestamp" | "amount"
  sortOrder?: "asc" | "desc"
}

export interface TransactionStats {
  totalTransactions: number
  totalAmount: number
  successfulTransactions: number
  failedTransactions: number
  pendingTransactions: number
  byType: Record<string, number>
  byStatus: Record<string, number>
}

export interface AuditLogEntry {
  id: string
  action: string
  timestamp: string
  userId: string
  userName: string
  details: string
  ipAddress?: string
  deviceInfo?: string
}
