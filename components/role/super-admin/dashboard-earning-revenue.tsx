import { SuperAdminRevenueCharts } from '@/components/shared/chats/super-admin-revenue-chart';

export default async function DashboardEarningRevenue() {
	const chartDataMonth = [
		{ name: 'Jan', total: 11700 },
		{ name: 'Feb', total: 400 },
	];
	const chartDataWeek = [
		{ name: 'Week 3', total: 1950 },
		{ name: 'Week 4', total: 6550 },
		{ name: 'Week 5', total: 3600 },
	];
	const chartDataDay = [
		{ name: '20-04', total: 1950 },
		{ name: '21-00', total: 1150 },
		{ name: '22-00', total: 1000 },
		{ name: '23-00', total: 1000 },
		{ name: '24-00', total: 1000 },
		{ name: '25-00', total: 800 },
		{ name: '26-00', total: 800 },
		{ name: '27-00', total: 800 },
		{ name: '28-00', total: 800 },
		{ name: '29-00', total: 800 },
		{ name: '30-00', total: 800 },
		{ name: '31-00', total: 800 },
		{ name: '01-00', total: 400 },
	];
	return (
		<div className='flex flex-col w-full aspect-[3/2] xl:aspect-[2/1] bg-secondary rounded-xl p-3 md:p-5'>
			<div className='text-2xl mb-2'>
				Earning Revenue
				<div className='text-2xl mb-4'>2023</div>
			</div>
			<div className='h-full'>
				<SuperAdminRevenueCharts data={chartDataDay} />
			</div>
		</div>
	);
}
