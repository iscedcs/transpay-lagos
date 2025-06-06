import { getDashboardTotalWeeklyRevenue } from "@/lib/get-data";
import DashboardCard from "./dashboard-card";

export default async function WeeklyTotalTracker() {
     const weeklyTotalRevenue =
          await getDashboardTotalWeeklyRevenue("TRACKER_FEES");
     return (
          <DashboardCard
               title="Weekly Total FareFlex"
               amount={weeklyTotalRevenue || 0}
               desc="Today"
          />
     );
}
