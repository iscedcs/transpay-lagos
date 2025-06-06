import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Transpay - Drivers',
	description: 'List of all drivers',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
