import React from 'react';
import DashboardCard from './dashboard-card';
import { getDashboard, getDashboardTotalDailyRevenue } from '@/lib/get-data';

export default async function DailyTotalRevenue() {
	const dailyRevenueTotal = await getDashboardTotalDailyRevenue(
		'DAILY_FEES'
	);
	return (
		<DashboardCard
			title='Daily Total Revenue'
			amount={dailyRevenueTotal || 0}
			desc='Today'
		/>
	);
}
