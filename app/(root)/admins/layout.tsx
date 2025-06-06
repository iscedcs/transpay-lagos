import { auth } from '@/auth';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
export const metadata: Metadata = {
	title: 'Transpay - Admins',
	description: 'List of all Admins',
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	if (session?.user.role.toLowerCase() !== 'superadmin') return notFound();
	return <>{children}</>;
}
