import React from 'react';
import DashboardCard from './dashboard-card';
import {
	getDashboard,
	getDashboardTotalDailyRevenue,
	getDashboardTotalWeeklyRevenue,
} from '@/lib/get-data';

export default async function WeeklyTotalRevenue() {
	const weeklyTotalRevenue = await getDashboardTotalWeeklyRevenue(
		'DAILY_FEES'
	);
	return (
		<DashboardCard
			title='Weekly Total Revenue'
			amount={weeklyTotalRevenue || 0}
			desc='Today'
		/>
	);
}
