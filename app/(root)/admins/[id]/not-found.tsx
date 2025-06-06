'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNotFound() {
	const router = useRouter();
	return (
		<div className='grid place-items-center w-full'>
			<div className='flex flex-col items-center justify-center text-center'>
				<h2>Admin Not Found</h2>
				<p>You might have the wrong admin id</p>
				<Button
					onClick={() => router.back()}
					variant='link'
				>
					Go Back
				</Button>
				<Button
					asChild
					variant='link'
				>
					<Link href='/admins'>View All Admins</Link>
				</Button>
			</div>
		</div>
	);
}
