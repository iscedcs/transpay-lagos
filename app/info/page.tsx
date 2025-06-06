import Searchbar from '@/components/ui/searchbar';
import React from 'react';

export default function SearchDriver() {
	return (
		<div className='w-[500px] mx-auto my-[200px]'>
			<Searchbar
				placeholder='Enter vehicle plate'
				variant='primary'
			/>
		</div>
	);
}
