import SearchVehicle from '@/components/pages/vehicle/search-vehicle';
import React from 'react';

interface PageProps {
	params: Promise<{ id: string }>;
}
export default async function SearchPage({ 
	params 
}: PageProps) {
	const resolvedParams = await params;
	return (
		<div className='w-full'>
			<SearchVehicle id={resolvedParams.id} />
		</div>
	);
}
