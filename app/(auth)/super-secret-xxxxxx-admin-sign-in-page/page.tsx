import { AdminLoginForm } from '@/components/forms/admin-login-form';
import Carousel from '@/components/layout/authCarousel';
import { SLIDES } from '@/lib/const';
import React from 'react';

export default function SignInGeneral() {
	return (
		<div>
			<div className=' capitalize text-h5Bold md:text-h4Bold mb-5 grid place-items-center'>
				Admin Login
			</div>
			<AdminLoginForm />
			<div>
				<div className='w-full flex flex-col mt-8 gap-7 bg-primary-900 text-white p-7 lg:hidden duration-700 rounded-2xl'>
					<Carousel slides={SLIDES} />
				</div>
			</div>
		</div>
	);
}
