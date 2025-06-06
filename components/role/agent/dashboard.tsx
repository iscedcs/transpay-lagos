import DashboardCard from '@/components/layout/dashboard-card';
import { AGENT_DASHBOARD_CARD } from '@/lib/const';
import React from 'react';

export default async function DashboardAgent() {
	return (
		<div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full'>
				{AGENT_DASHBOARD_CARD.map((card: DashboardCardI, i) => (
					<DashboardCard
						key={i}
						name={card.name}
						image={card.image}
						href={card.href}
						description={card.description}
						number={card.number}
						icon={card.icon}
					/>
				))}
			</div>
		</div>
	);
}
