export interface DashboardStats {
  totalVehicles: number;
  totalRevenue: number;
  complianceRate: number;
  activeUsers: number;
  pendingTasks?: number;
  todayScans?: number;
}

export interface StatePerformance {
  stateName: string;
  totalLgas: number;
  complianceRate: number;
  monthlyRevenue: number;
  registeredVehicles: number;
}

export interface LgaPerformance {
  lgaId: string;
  lgaName: string;
  complianceRate: number;
  registeredVehicles: number;
  monthlyRevenue: number;
  activeAgents: number;
}

export interface Activity {
  id: string;
  type: "registration" | "scan" | "payment" | "violation";
  description: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  category: string;
  ownerId: string;
  ownerName: string;
  lgaId: string;
  complianceStatus: "compliant" | "non_compliant" | "grace_period";
  lastPayment?: Date;
  nextDue?: Date;
}
