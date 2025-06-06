import Navbar from '@/components/layout/navbar';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Transpay - Search Vehicle',
	description: 'Payment system for the government',
};

export default function SearchLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='h-screen flex flex-col justify-between'>
			<Navbar />
			<div className='flex h-full'>{children}</div>
		</div>
	);
}
