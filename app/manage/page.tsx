import { ManageDetails } from '@/components/layout/manageDetails';
import Image from 'next/image';
import React from 'react';

export default function ManageAccount() {
	return (
		<div className='w-full flex items-center flex-col gap-4 '>
			<Image
				className='mt-4'
				src='/avater2.png'
				alt='avater'
				width='150'
				height='150'
			/>
			<p className='text-h4Bold'>{`Welcome, Agent ISCE`}</p>
			<p className='text-title1 p-3 text-center'>
				{`Manage your account, view and edit personal information,
				change password.`}
			</p>
			<div className='grid grid-cols-1 lg:grid-cols-2 p-6 gap-8 pb-10'>
				<ManageDetails
					link='/manage/profile'
					title='Personal Information'
					description='View and edit your personal Information, request for a change in location '
				/>
				<ManageDetails
					link='/manage/security'
					title='Security & Password Change'
					description='Security Information and Request for a change in password.'
				/>
				<ManageDetails
					className=' lg:col-span-2'
					link='/manage/about'
					title='About Us'
					description='Transpay is a government approved software developed to ensure safety and accountability on the road..... Learn More'
				/>
			</div>
		</div>
	);
}
