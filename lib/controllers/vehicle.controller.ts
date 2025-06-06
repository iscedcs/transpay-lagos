import { BASE_URL } from '../const';

export const dynamic = 'force-dynamic';

export const getMyVehicles = async (fields?: string, limit?: number) => {
	const url = `${BASE_URL}/api/vehicles${fields ? '?fields=' + fields : ''}`;
	const res = await fetch(url, { cache: 'no-store' });
	const data: Promise<Partial<IVehicle[]>> = await res.json();
	if (!res.ok) return undefined;
	const vehicles = data;
	return vehicles;
};
