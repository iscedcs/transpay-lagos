import { getPropertyById } from '@/app/api/property';
import { Separator } from '@/components/ui/separator';
import { propertyPaymentColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';


interface PageProps {
	params: Promise<{ property: string }>;
}
export default async function SinglePropertyPage({
	params,
}:PageProps) {
	const property = await getPropertyById((await params).property);
	if (!property) return notFound();
	return (
		<div className='px-5 lg:px-10 flex flex-col gap-3 w-full'>
			<div className='rounded-2xl p-5'>
				<div className='uppercase font-bold'>Property Summary</div>
				<div className='uppercase font-bold text-lg'>
					Property Identification Number: {property?.propertyId}
				</div>
				<Separator className='mb-5' />
				<div className='flex gap-5'>
					<div className='w-full lg:w-3/5 shrink-0'>
						<div className='grid lg:grid-cols-3 mb-5'>
							<div className='flex flex-col gap-2 pr-3 pb-3'>
								<div className=''>
									<div className='uppercase font-bold'>
										Address
									</div>
									<div className=''>
										{property.address}
									</div>
								</div>
								<div className=''>
									<div className='uppercase font-bold'>
										Owner Name
									</div>
									<div className=''>
										{property.ownerName}
									</div>
								</div>
							</div>
							<div className='flex flex-col gap-2 pr-3 pb-3'>
								<div className=''>
									<div className='uppercase font-bold'>
										Usage Type
									</div>
									<div className=''>
										{property?.propertyType}
									</div>
									{/* residential, agricultural, recreation, transportation, and commercial. */}
								</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									# of unit
								</div>
								<div className=''>1</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									Beds/Baths
								</div>
								<div className=''>3/3</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									Building SqFt
								</div>
								<div className=''>1,632</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									Land SqFt
								</div>
								<div className=''>1,932</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									Year Built
								</div>
								<div className=''>1962</div>
							</div>
							<div className='pr-3 pb-3'>
								<div className='uppercase font-bold'>
									Effective Year
								</div>
								<div className=''>1964</div>
							</div>
						</div>
					</div>
					<div className='w-full lg:w-2/5 shrink-0'>
						<div className='rounded-2xl overflow-clip border aspect-video'>
							<Image
								src={`/maps/2.png`}
								className='w-full h-full object-cover object-center'
								alt='map location'
								height={900}
								width={1600}
							/>
						</div>
					</div>
				</div>
				<div className='uppercase font-bold text-lg'>
					Tax Overview
				</div>
				<Separator className='mb-5' />
				<div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10'>
					<div className=''>
						<div className='uppercase font-bold'>
							Accessment Value
						</div>
						<div className=''>
							{`#${property.assessmentValue}`}
						</div>
					</div>
					<div className=''>
						<div className='uppercase font-bold'>
							Tax Rate
						</div>
						<div className=''>{`${property?.taxRate}%`}</div>
					</div>
					<div className=''>
						<div className='uppercase font-bold'>
							Tax Rate
						</div>
						<div className=''>{`${property?.taxRate}%`}</div>
					</div>
					<div className=''>
						<div className='uppercase font-bold'>
							Tax Status
						</div>
						<div
							className={`${
								property.isPaid
									? 'text-awesome-foreground'
									: 'text-destructive-foreground'
							} uppercase font-extrabold`}
						>
							{property.isPaid ? 'Cleared' : 'Owing'}
						</div>
					</div>
					{!property.isPaid && (
						<>
							<div className=''>
								<div className='uppercase font-bold'>
									Amount Owed
								</div>
								<div className=''>{`#${
									property.taxRate! *
									property.assessmentValue!
								}`}</div>
							</div>
							<div className=''>
								<div className='uppercase font-bold'>
									Payment Due Date
								</div>
								<div className=''>
									{property.paymentDueDate}
								</div>
							</div>
						</>
					)}
				</div>
				<div className='uppercase font-bold text-lg'>
					Payment History
				</div>
				<Separator className='mb-5' />
				<DataTable
					showColumns
					showPagination
					columns={propertyPaymentColumns}
					data={property.paymentRecords || []}
				/>
			</div>
		</div>
	);
}
