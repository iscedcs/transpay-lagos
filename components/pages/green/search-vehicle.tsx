'use client';
import { Button } from '@/components/ui/button';
import { loadingSpinner, searchIcon } from '@/lib/icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function GreenSearchVehicle() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		router.push(`/green-engine/${searchValue.toLowerCase()}`);
	};
	return (
		<form
			className={`flex relative text-body w-full items-center h-10 rounded-[40px] overflow-hidden border my-5`}
			onSubmit={handleSubmit}
		>
			<Button
				type='submit'
				className='absolute h-10 w-10 p-2 aspect-square z-10 rounded-none flex justify-center items-center'
			>
				{isLoading ? loadingSpinner : searchIcon}
			</Button>
			<input
				name='search'
				type='text'
				placeholder={'Enter vehicle plate number'}
				value={searchValue}
				required
				onChange={(e) => setSearchValue(e.target.value)} // Update searchValue when the input changes
				className={`bg-transparent focus:outline-0 pl-16 py-4 h-10 w-full rounded-2xl absolute`}
			/>
		</form>
	);
}
