import { getDashboardTotalMonthlyRevenue } from '@/lib/get-data';
import DashboardCard from './dashboard-card';

export default async function MonthlyTotalRevenue() {
	const monthlyRevenueTotal = await getDashboardTotalMonthlyRevenue(
		'DAILY_FEES'
	);
	return (
		<DashboardCard
			title='Monthly Total Revenue'
			amount={monthlyRevenueTotal || 0}
			desc='Month Till Date'
		/>
	);
}
