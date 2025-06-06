import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default function WebAgentCard({
	name,
	description,
	href,
	number,
	icon,
	image,
}: DashboardCardI) {
	return (
		<Link href={href}>
			<Card className='w-[278px] h-[280px] bg-secondary overflow-hidden rounded-2xl shadow-2xl'>
				<CardHeader className='p-0 h-[160px] w-full overflow-hidden'>
					<Image
						src={image || '/tricycle.jpg'}
						alt={name}
						height={140}
						width={278}
						className='w-full h-full  object-center object-cover'
					/>
				</CardHeader>
				<CardContent className='p-3'>
					<div className='flex flex-col gap-1.5'>
						<div className='text-h5 '>{name}</div>
						<div className='text-title2'>{description}</div>
						{number && (
							<div className='flex justify-start gap-1.5 items-center text-title '>
								<div className='h-4 w-4'>{icon}</div>
								<div className=''>{number}</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
