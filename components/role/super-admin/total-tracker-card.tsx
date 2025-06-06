import { getDashboardTotalTracker } from "@/lib/controllers/revenue.controller";
import DashboardCard from "./dashboard-card";

export default async function TotalTrackerCard({
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
     const total = await getDashboardTotalTracker(startDate, endDate);
     return <DashboardCard title={title} amount={total || 0} desc={desc} />;
}
