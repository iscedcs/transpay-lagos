import { adminsColumns } from '@/components/ui/table/columns';
import { DataTable } from '@/components/ui/table/data-table';
import { getDashboardBlacklistedAdmin } from '@/lib/get-data';

export default async function DashboardBlacklisted() {
	const blacklisted = await getDashboardBlacklistedAdmin();
	return (
		blacklisted &&
		blacklisted.length > 0 && (
			<div className='w-full bg-secondary rounded-xl p-3 md:p-5'>
				<div className='text-2xl mb-2 px-4'>Blacklisted Admin</div>
				<DataTable
					showPagination={false}
					columns={adminsColumns}
					data={blacklisted?.slice(0, 4) || []}
				/>
			</div>
		)
	);
}
