import { getDashboardTotalRevenue } from "@/lib/controllers/revenue.controller";
import DashboardCard from "./dashboard-card";

export default async function TotalRevenueCard({
     startDate,
     endDate,
     title,
     desc,
}: {
     startDate: string;
     endDate: string;
     title: string;
     desc: string;
}) {
     const total = await getDashboardTotalRevenue(startDate, endDate);
     return <DashboardCard title={title} amount={total || 0} desc={desc} />;
}
