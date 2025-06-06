import { Button } from '@/components/ui/button';
import FinesCardP from '@/components/ui/fines-card';
import Searchbar from '@/components/ui/searchbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FINE_CARDS } from '@/lib/const';
import { addIcon } from '@/lib/icons';
import Link from 'next/link';
import React from 'react';

export default function Fines() {
	return (
		<div className='p-3 lg:p-12 w-full flex flex-col gap-6 '>
			<div className='flex justify-between'>
				<div className=' shrink-0 grow-0'>Fines & Penalties</div>
				<div className=' shrink-0 grow-0'>
					<Button
						className='justify-start rounded-xl'
						asChild
						variant={'default'}
					>
						<Link
							href={'/fines/add-new'}
							className='shrink-0 whitespace-nowrap'
						>
							<div className='mr-2 h-4 w-4 shrink-0'>
								{addIcon}
							</div>
							Add New Fines
						</Link>
					</Button>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<Tabs
					defaultValue='all'
					className='w-full'
				>
					<div className='flex flex-col gap-5'>
						<TabsList>
							<TabsTrigger
								className=''
								value='all'
							>
								All Penalties
							</TabsTrigger>
							<TabsTrigger value='fines'>
								Fines
							</TabsTrigger>
							<TabsTrigger value='penalties'>
								Penalties
							</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value='all'>
						<div className=' flex flex-wrap gap-4 w-full'>
							<Searchbar
								variant='secondary'
								placeholder='Search Penalties'
							/>
							{FINE_CARDS.map((fine) => (
								<FinesCardP
									key={fine.id}
									id={fine.id}
									amount={fine.amount}
									type={fine.type}
									title={fine.title}
									description={fine.description}
								/>
							))}
						</div>
					</TabsContent>
					<TabsContent value='fines'>
						Category fines tab
					</TabsContent>
					<TabsContent value='penalties'>
						Category penalties tab
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
