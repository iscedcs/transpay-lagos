import { API, URLS } from '../const';
import { getSSession } from '../get-data';

export const getDrivers = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.driver.all;
	const res = await fetch(url, { headers, cache: 'no-store' });
	if (!res.ok) return undefined;
	const data: Promise<IDrivers> = await res.json();
	const drivers = (await data).data.drivers;
	return drivers;
};
