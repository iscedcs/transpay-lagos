import { Card } from '../ui/card';

export default function StatsCard({
	title,
	amount,
	type,
	percentage,
	desc,
}: {
	title: string;
	amount: string;
	type?: 'up' | 'down' | '';
	percentage: string | number;
	desc?: string;
}) {
	return (
		<Card className='bg-secondary h-32 overflow-clip p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-2'>
			<div className=''>
				<div className='font-bold'>{title}</div>
				<div className='text-xs'>{desc}</div>
			</div>
			<div className='flex text-2xl font-bold'>₦{amount}</div>
		</Card>
	);
}
