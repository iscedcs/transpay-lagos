import { CopyButton } from '@/components/shared/copy-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { debtColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getVehicleSummary } from '@/lib/controllers/vehicle-controller';
import { failureIcon, successIcon } from '@/lib/icons';
import { isBefore } from 'date-fns';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function NoLoginSearch({
	plateNumber,
}: {
	plateNumber: string;
}) {
	const vehicle = await getVehicleSummary(plateNumber);
	// sonsole.log('TEST......', vehicle);
	if (!vehicle) {
		notFound();
	}
	const onWaiver = vehicle.status === 'inactive';

	// const pendingPayments = vehicle.VehicleTransactions.filter(
	// 	(transaction) => transaction.payment_status === 'pending'
	// );

	// const totalPendingAmount = pendingPayments.reduce(
	// 	(acc, order) => acc + order.amount,
	// 	0
	// );

	const isOwing = isBefore(
		new Date(vehicle.wallet.next_transaction_date),
		new Date()
	);

	return (
		<div className='h-full w-full max-w-xl mx-auto pb-3 px-3 flex flex-col gap-2'>
			<div className='flex flex-col text-center justify-between w-full gap-1'>
				<div className='text-sm'>
					<div className='uppercase'>{`Vehicle Owner`}</div>
					<div className='text-xl font-bold'>
						{vehicle.owner.firstName}{""}{vehicle.owner.lastName}
					</div>
				</div>
				<div className='text-sm uppercase'>
					<div className=''>Plate number</div>
					<div className='text-xl font-bold'>
						{vehicle.plateNumber}
					</div>
				</div>
				{vehicle.id && vehicle.id !== '' && (
					<Button
						className='w-full max-w-xl mx-auto text-white rounded-xl bg-primary-800'
						asChild
						variant={'default'}
					>
						<Link
							href={`/vehicles/${vehicle.id}/location`}
							className='shrink-0 whitespace-nowrap'
						>
							<MapPin className='mr-2 h-4 w-4 shrink-0' />
							View live location
						</Link>
					</Button>
				)}
			</div>
			<Tabs
				defaultValue='overview'
				className='w-full'
			>
				<TabsList className='grid grid-cols-2'>
					<TabsTrigger value='overview'>OVERVIEW</TabsTrigger>
					<TabsTrigger value='history'>HISTORY</TabsTrigger>
				</TabsList>
				<TabsContent value='overview'>
					<Card className='grid gap-2 w-full p-3 bg-secondary text-xs lg:text-base'>
						<div className='uppercase text-center font-bold pb-3'>
							Payment Details
						</div>
						<div className=''>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Bank Name</div>
								{vehicle.wallet.meta.bank_name}
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Account Name</div>
								{vehicle.wallet.meta.account_name}
							</div>
							<div className='flex justify-between items-center gap-5'>
								<div className=''>Account Number</div>
								{vehicle.wallet.meta.nuban}
							</div>
						</div>
						<CopyButton
							label='Copy Account Details'
							text={`${vehicle.wallet.meta.bank_name} ${vehicle.wallet.meta.nuban} ${vehicle.wallet.meta.account_name}`}
						/>
					</Card>
					<div className='w-full'>
						{onWaiver ? (
							<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
								<div className=' text-green-500'>
									{successIcon}
								</div>
								<div className='flex py-2'>
									<div className='shrink-0 grow-0 text-title1Bold'>
										Vehicle is on Waiver!
									</div>
								</div>
								<Button asChild>
									<Link
										href={'waiver/history'}
										className='uppercase'
									>
										View Waiver History
									</Link>
								</Button>
							</div>
						) : isOwing ? (
							<>
								<div className='flex flex-col p-3 w-full items-center gap-2'>
									<div className=' text-red-500'>
										{failureIcon}
									</div>
									<div className='flex flex-col items-center py-2'>
										<div className='shrink-0 grow-0 text-title1Bold'>
											Vehicle is Owing!
										</div>
										<div className='text-destructive-foreground font-bold text-4xl'>
											{`₦${vehicle.wallet.amount_owed}`}
										</div>
									</div>
								</div>
							</>
						) : (
							<div className='flex flex-col p-3 w-full items-center gap-2 mb-20'>
								<div className=' text-green-500'>
									{successIcon}
								</div>
								<div className='flex py-2'>
									<div className='shrink-0 grow-0 text-title1Bold'>
										Vehicle is clear!
									</div>
								</div>
							</div>
						)}
					</div>
				</TabsContent>
				<TabsContent value='history'>
					<div className='w-full grid'>
						<DataTable
							showPagination
							columns={debtColumns}
							// data={vehicle.VehicleTransactions.slice(
							// 	0,
							// 	10
							// )}
							data={[]}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
