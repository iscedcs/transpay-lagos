import StatsCard from '@/components/shared/statistics-card';
import { getRevenueStats } from '@/lib/controllers/revenue.controller';
import React from 'react';

export default async function RevenueSummary({
	start,
	end,
	type,
	title,
	description,
}: {
	start: string;
	end: string;
	type: 'DAILY_FEES' | 'ALL' | 'TRACKER_FEES';
	title: string;
	description?: string;
}) {
	const revenueData = await getRevenueStats(start, end, type);
	return (
		<StatsCard
			desc={description}
			percentage={100}
			type='up'
			title={title}
			amount={String(revenueData !== null ? revenueData : 0)}
		/>
	);
}
