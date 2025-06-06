import { getSSession } from '@/lib/get-data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Transpay - Settings',
	description: 'List of all Settings',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { role } = await getSSession();
	if (role?.toLowerCase() !== 'superadmin') return notFound();
	return <>{children}</>;
}
