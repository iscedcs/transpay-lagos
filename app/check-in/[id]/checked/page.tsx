import { getVehicleByPlate } from '@/app/api/check-in/test';
import { format, getUnixTime } from 'date-fns';
import { CheckCircle2Icon } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
	const v = await getVehicleByPlate((await params).id);
	if (!v) return notFound();
	return (
		<div className='w-full max-w-sm mx-auto min-h-[20svh] flex flex-col gap-3'>
			<div className='flex justify-between items-center gap-5'>
				<div className=''>Plate Number</div>
				{v.plate}
			</div>
			<div className='flex justify-between items-center gap-5'>
				<div className=''>Owner</div>
				{v.ownername}
			</div>
			<div className='flex justify-between items-center gap-5'>
				<div className=''>Time In</div>
				{format(new Date(v.checkintime!), 'MMM, dd - HH:mm:ss')}
			</div>
			{!v.ischeckedin && (
				<>
					<div className='flex justify-between items-center gap-5'>
						<div className=''>Time Out</div>
						{format(
							new Date(v.checkouttime!),
							'MMM, dd - HH:mm:ss'
						)}
					</div>
					<div className='flex justify-between items-center gap-5'>
						<div className=''>Duration In State</div>
						{getUnixTime(new Date(v.checkouttime!)) -
							getUnixTime(new Date(v.checkintime!))}{' '}
						seconds
					</div>
					<div className='flex justify-between items-center gap-5'>
						<div className=''>Fee per second</div>
						NGN {20}
					</div>
					<div className='flex justify-between items-center gap-5'>
						<div className=''>Amount Due</div>
						NGN{' '}
						{(getUnixTime(new Date(v.checkouttime!)) -
							getUnixTime(new Date(v.checkintime!))) *
							20}
					</div>
				</>
			)}
			<div className='flex flex-col items-center justify-center text-xl'>
				<CheckCircle2Icon className='h-24 w-24 text-awesome-foreground' />
				{v.ischeckedin
					? 'Checked In Successful'
					: 'Checked Out Successful'}
			</div>
		</div>
	);
}
