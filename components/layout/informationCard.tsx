import React from 'react';
import ProfileInformation from './profileInformation';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '../ui/button';
import { editIcon } from '@/lib/icons';
import Link from 'next/link';

interface INFORMATIONCARDI {
	header: string;
	link: string;
	info: {
		title: string;
		entry: string;
	}[];
}
export function InformationCard({ header, info, link }: INFORMATIONCARDI) {
	return (
		<div className='bg-secondary lg:w-[926px] rounded-[20px] p-6 flex flex-col'>
			<h3 className='text-h5Bold'>{header}</h3>
			<div className='flex justify-between'>
				<div className=''>
					{info.map((i, k) => (
						<ProfileInformation
							title={i.title}
							entry={i.entry}
							key={k}
						/>
					))}
				</div>
				<div className=''>
					<Link
						className=''
						href={link}
					>
						<Button className='z-10 w-[100px] mt-auto'>
							{editIcon}{' '}
							<p className='ml-2 text-title1Bold'>EDIT</p>{' '}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export function InformationCardVariant({
	header,
	info,
	link,
}: INFORMATIONCARDI) {
	return (
		<div className='bg-secondary lg:w-[926px] rounded-[20px] p-6 flex flex-col'>
			<h3 className='text-h5Bold'>{header}</h3>
			<div className='flex justify-between'>
				<div className=''>
					{info.map((i, k) => (
						<ProfileInformation
							title={i.title}
							entry={i.entry}
							key={k}
						/>
					))}
				</div>
				<div className='mt-[100px]'>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button>Change Password</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This
									will permanently delete your
									account and remove your data from
									our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>
									Cancel
								</AlertDialogCancel>
								<AlertDialogAction>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	);
}
