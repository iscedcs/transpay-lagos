import { LoginForm } from '@/components/forms/login-form';
import Carousel from '@/components/layout/authCarousel';
import { SLIDES } from "@/lib/const";

export default async function SignInGeneral(props: {
	searchParams: Promise<{ error?: string }>;
}) {
	const searchParams = await props.searchParams
	const errorMessage = searchParams.error ? 'Invalid email or password' : '';

	return (
		<div>
			<LoginForm error={errorMessage} />
			<div>
				<div className='w-full flex flex-col mt-8 gap-7 bg-primary-800 text-white p-7 lg:hidden duration-700 rounded-2xl'>
					<Carousel slides={SLIDES} />
				</div>
			</div>
		</div>
	);
}
