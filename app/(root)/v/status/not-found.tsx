import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VehiclesPageNotFound() {
	return (
		<div className='grid place-items-center w-full'>
			<div className='flex flex-col h-[80svh] items-center justify-center text-center'>
				<h2 className='text-4xl text-center'>
					Sticker Not Attached
					<br />
					To A Vehicle
				</h2>
				<Button
					asChild
					variant='link'
				>
					<Link href='/'>Go to Dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
