import { paymentColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getVehicleById } from '@/lib/controllers/vehicle-controller';
import { notFound } from 'next/navigation';
import React from 'react';


interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function Payments({
	 params 
	}: PageProps) {
	const vehicle = await getVehicleById((await params).id);
	if (!vehicle) return notFound();
	return (
		<div className='w-full flex flex-col gap-3 mb-8 p-2 xs:p-5 '>
			<div className=' text-title1Bold py-2 '>
				All payment for vehicle owned by {vehicle?.owner.firstName}{" "}{vehicle?.owner.lastName}
			</div>

			<div className='flex flex-col gap-2 mb-20'>
				<div className=''>
					<DataTable
						showPagination
						columns={paymentColumns}
						// data={vehicle.VehicleTransactions}
						data={[]}
					/>
				</div>
			</div>
		</div>
	);
}
