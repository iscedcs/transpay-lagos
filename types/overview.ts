export interface KPIStats {
  totalVehicles: number
  compliantVehicles: number
  compliancePercentage: number
  outstandingLevies: number
  scansToday: number
  agentsActiveToday: number
  stickersAssigned?: number
  totalCollected?: number
}

export interface ComplianceData {
  date: string
  compliant: number
  nonCompliant: number
}

export interface RegistrationData {
  date: string
  registrations: number
}

export interface AgentPerformance {
  id: string
  name: string
  role: string
  assignedLga: string
  vehiclesRegistered: number
  scansCompleted: number
  lastActive: Date
  avatar?: string
}

export interface TopDefaulter {
  id: string
  plateNumber: string
  ownerName: string
  status: string
  amountOwed: number
  daysMissed: number
}

export interface RecentActivity {
  id: string
  type: "registration" | "scan" | "sticker" | "account" | "payment"
  description: string
  timestamp: Date
  userId: string
  userName: string
  vehicleId?: string
  plateNumber?: string
}

export interface VehicleStatusData {
  status: string
  count: number
  percentage: number
}

export interface ActivityTrendData {
  date: string
  registrations: number
  scans: number
  payments: number
}

export interface LGAOverviewData {
  lga: {
    id: string
    name: string
    stateName: string
    code: string
  }
  stats: KPIStats
  vehicleStatus: VehicleStatusData[]
  activityTrend: ActivityTrendData[]
  recentVehicles: Array<{
    id: string
    plateNumber: string
    registeredDate: Date
    ownerName: string
    status: string
  }>
  agents: AgentPerformance[]
}
