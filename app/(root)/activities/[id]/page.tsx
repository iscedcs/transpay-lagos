import { Button } from '@/components/ui/button';
import { getActivityById } from '@/lib/controllers/activity.controller';
import { unslugify } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Activity({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const activity = await getActivityById(resolvedParams.id);

	if (!activity) return notFound();
	
	return (
		<div className='grid place-items-center w-full h-full'>
			<div className='flex flex-col items-center justify-center'>
				<div className='text-2xl mb-10'>
					Activity {unslugify(activity?.name)}
				</div>
				<div className=''>
					<div className=''>Activity: {activity?.name}</div>
					<div className=''>Activity ID: {activity?.id}</div>
					<div className=''>
						Activity Description: {activity?.description}
					</div>
					<div className=''>
						Activity Date:{' '}
						{new Date(
							activity.createdAt
						).toLocaleDateString()}
					</div>
					<div className=''>
						Activity Time:{' '}
						{new Date(
							activity.createdAt
						).toLocaleTimeString()}
					</div>
				</div>
				<Button
					asChild
					className='w-full mt-10 uppercase'
				>
					<Link href='/activities'>Back To Activities</Link>
				</Button>
			</div>
		</div>
	);
}
