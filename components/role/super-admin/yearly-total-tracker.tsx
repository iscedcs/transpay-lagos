import { getDashboardTotalYearlyRevenue } from "@/lib/get-data";
import DashboardCard from "./dashboard-card";

export default async function YearlyTotalTracker() {
     const yearlyRevenueTotal =
          await getDashboardTotalYearlyRevenue("TRACKER_FEES");
     return (
          <DashboardCard
               title="Yearly Total FareFlex"
               amount={yearlyRevenueTotal || 0}
               desc="Year Till Date"
          />
     );
}
