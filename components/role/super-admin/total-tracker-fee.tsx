import { getDashboardTotalTrackerFees } from "@/lib/get-data";
import DashboardCard from "./dashboard-card";

export default async function TotalTrackerRevenue() {
     const trackerFeesTotal = await getDashboardTotalTrackerFees();
     return (
          <DashboardCard
               title="FareFlex Fees"
               amount={trackerFeesTotal || 0}
               desc="Total tracker fees"
          />
     );
}
