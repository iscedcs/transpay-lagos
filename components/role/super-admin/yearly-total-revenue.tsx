import { getDashboardTotalRevenue } from "@/lib/get-data";
import DashboardCard from "./dashboard-card";
import { format, subYears } from "date-fns";

export default async function YearlyTotalRevenue() {
     const today = new Date();
     const one_year_ago = subYears(today, 1);
     const yearlyRevenueTotal = await getDashboardTotalRevenue(
          format(one_year_ago, "yyyy-MM-dd"),
          format(today, "yyyy-MM-dd"),
     );
     return (
          <DashboardCard
               title="Yearly Total Revenue"
               amount={yearlyRevenueTotal || 0}
               desc="Year Till Date"
          />
     );
}
