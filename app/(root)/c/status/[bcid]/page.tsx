import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import React from 'react';

interface PageProps {
	params: Promise<{ bcid: string }>;
};

export default async function StatusPage({ 
	params 
	
}: PageProps) {
	const id = (await params).bcid;
	return (
		<div className='w-full'>
			<SearchVehicle id={id} />
		</div>
	);
}
