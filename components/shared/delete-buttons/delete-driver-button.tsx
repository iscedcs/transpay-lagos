'use client';
import { loadingSpinner } from '@/lib/icons';
import React from 'react';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

export default function DeleteDriverButton({ id }: { id: string }) {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const handleDelete = async (id: string) => {
		setIsLoading(true);
		try {
			const createDriverResponse = await fetch('/api/create-driver/', {
				method: 'DELETE',
				body: JSON.stringify({
					driver_id: id,
				}),
			});
			const result = await createDriverResponse.json();
			if (
				createDriverResponse.status > 199 &&
				createDriverResponse.status < 299
			) {
				toast({
					title: 'Updated Successfully',
				});
				setIsLoading(false);
				router.push(`/drivers`);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Not Updated',
				});
				throw new Error(
					`Something Went wrong ${result.statusText}`
				);
			}
		} catch (error) {
			setIsLoading(false);
		}
	};
	return (
		<div
			className='items-center cursor-pointer'
			onClick={() => handleDelete(id)}
		>
			<span className='h-4 w-4'>
				{isLoading ? (
					<div className='h-4 w-4 object-contain'>
						{loadingSpinner}
					</div>
				) : (
					'Delete Driver'
				)}
			</span>
		</div>
	);
}
