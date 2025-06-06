'use client';
import FineForm from '@/components/forms/fine-form';
import { addIcon } from '@/lib/icons';
import React from 'react';

export default function AddNewFines() {
	const fine: FinesCardP = {
		id: Date.now(),
		title: '',
		description: '',
		amount: 0,
		type: 'fine',
	};
	return (
		<div className=' p-10 w-full h-full '>
			<div className=' py-4'>
				<h1 className=' text-h2Bold '>Add New Fines</h1>
				<p className=' text-title2Bold'>
					Fill in Offence Information
				</p>
			</div>
			<div className=' flex w-full h-14 items-center text-lg py-2 text-white bg-[#4D4100] rounded-3xl'>
				<div className=' h-14 w-16 shrink-0 p-4 bg-black rounded-l-3xl'>
					{addIcon}
				</div>
				<div className=' pl-4'>OFFENCE & PENALTY DETAILS</div>
			</div>
			<FineForm fine={fine} />
		</div>
	);
}
