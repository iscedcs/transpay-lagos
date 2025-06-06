import FineForm from '@/components/forms/fine-form';
import { FINE_CARDS } from '@/lib/const';
import React from 'react';

interface PageProps {
	params: Promise<{ fineId: number }>;
}
export default async function AddNewFines({
	params,
}: PageProps) {
	const resolvedParams = await params;
	const fine = FINE_CARDS.find(
		(singleFine) => singleFine.id == resolvedParams.fineId
	);
	if (fine) {
		return (
			<div className='w-full p-3 xs:p-5'>
				<div className=' py-4'>
					<h1 className=' text-h4Bold '>Edit Fines</h1>
				</div>
				<FineForm fine={fine} />
			</div>
		);
	} else {
		return <div className='w-full p-3 xs:p-5'>Cannot Find Fine</div>;
	}
}
