import { AuthLoginForm } from '@/components/forms/auth-login-form';
import Carousel from '@/components/layout/authCarousel';
import { Button } from '@/components/ui/button';
import { SLIDES } from '@/lib/const';
import Link from 'next/link';
import React from 'react';

export default function SignIn() {
	return (
		<div>
			<div className=' capitalize text-h4Bold md:text-h3Bold mb-5 grid place-items-center'>
				Agent Login
			</div>
			<AuthLoginForm />
			<div className='grid place-items-center'>
				<Button
					asChild
					variant='link'
				>
					<Link href='/sign-in'>LOGIN AS ADMIN</Link>
				</Button>
			</div>
			<div className='w-full flex flex-col mt-8 gap-7 bg-primary-900 text-white p-7 lg:hidden duration-700 rounded-2xl'>
				<Carousel slides={SLIDES} />
			</div>
		</div>
	);
}
