import type { DashboardStats } from "@/types/dashboard";

export async function getDashboardStats(
  userId: string,
  role: string
): Promise<DashboardStats> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    totalVehicles: 15420,
    totalRevenue: 45230000,
    complianceRate: 87,
    activeUsers: 234,
    pendingTasks: 12,
    todayScans: 156,
  };
}
