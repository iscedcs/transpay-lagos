import { getDashboardTotalDailyRevenue } from "@/lib/get-data";
import DashboardCard from "./dashboard-card";

export default async function DailyTotalTracker() {
     const dailyRevenueTotal =
          await getDashboardTotalDailyRevenue("TRACKER_FEES");
     return (
          <DashboardCard
               title="Daily Total FareFlex"
               amount={dailyRevenueTotal || 0}
               desc="Today"
          />
     );
}
