'use client';
import { NewWaiverForm } from '@/components/forms/new-waiver-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function WaiverButton({
	vehicle,
}: {
	vehicle: IVehicleSummary;
}) {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop)
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button
						className='justify-start rounded-xl'
						variant={'default'}
					>
						<PlusIcon className='mr-1 h-4 w-4 shrink-0' />
						New Waiver
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogTitle>Request New Waiver</DialogTitle>
					<NewWaiverForm vehicle={vehicle} />
				</DialogContent>
			</Dialog>
		);
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					className='justify-start rounded-xl'
					variant={'default'}
				>
					<PlusIcon className='mr-1 h-4 w-4 shrink-0' />
					New Waiver
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className='gap-5'>
					<DrawerTitle>Request New Waiver</DrawerTitle>
					<NewWaiverForm vehicle={vehicle} />
				</DrawerHeader>
			</DrawerContent>
		</Drawer>
	);
}
