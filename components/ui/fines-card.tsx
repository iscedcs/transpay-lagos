import React from 'react';
import { Button } from './button';
import Link from 'next/link';
import { addIcon, deleteIcon, dotsIcon, editIcon } from '@/lib/icons';
import { Card } from './card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { MoreVertical } from 'lucide-react';

export default function FinesCardP({
	id,
	title,
	description,
	type,
	amount,
}: FinesCardP) {
	return (
		<Card className='px-7 py-6 w-[441px]'>
			<div className=' flex justify-between'>
				<h2 className=' text-title1Bold'>{title}</h2>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='h-8 w-8 p-0'
						>
							<span className='sr-only'>Open menu</span>
							<MoreVertical className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuItem asChild>
							<Link href={`/fines/${id}`}>
								<span className='h-4 w-4 mr-3'>
									{editIcon}
								</span>
								Edit Fine
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className='text-destructive'>
							<span className='h-4 w-4 mr-3'>
								{deleteIcon}
							</span>
							Delete Fine
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<p className=' py-4 text-title1'>{description}</p>
			<div className=' flex items-center justify-between '>
				<h3 className='text-lg capitalize'>{type}</h3>
				<Button
					variant='default'
					className='rounded-xl'
				>
					₦{amount}
				</Button>
			</div>
		</Card>
	);
}
