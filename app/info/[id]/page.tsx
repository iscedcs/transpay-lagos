import ViewVehicleDetails from '@/components/pages/vehicle/view-vehicle-details';
import React from 'react';

export default async function SearchPage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	return (
		<div className='w-full'>
			<ViewVehicleDetails id={id} />
		</div>
	);
}
