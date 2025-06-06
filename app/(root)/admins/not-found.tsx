'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminsPageNotFound() {
	const router = useRouter();
	return (
		<div className='grid place-items-center w-full'>
			<div className='flex flex-col items-center justify-center text-center'>
				<h2>Page Not Found</h2>
				<p>You might not have permission to view this page</p>
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
					<Link href='/dashboard'>Go to Dashboard</Link>
				</Button>
			</div>
		</div>
	);
}
