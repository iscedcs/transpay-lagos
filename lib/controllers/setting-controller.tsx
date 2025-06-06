import { API, URLS } from '../const';
import { getSSession } from '../get-data';

export const getSettings = async () => {
	const session = await getSSession();
	const headers = {
		'Content-Type': 'application/json',
		'api-secret': process.env.API_SECRET || '',
		Authorization: `Bearer ${session.access_token}`,
	};
	const url = API + URLS.settings;
	const res = await fetch(url, { headers, next: { revalidate: 0 } });
	if (!res.ok) return undefined;
	const data: Promise<IResSettings> = await res.json();
	const settings = (await data).data.settings;
	return settings;
};

// export const mainJobs = async () => {
// 	const session = await getSSession();
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		'api-secret': process.env.API_SECRET || '',
// 		Authorization: `Bearer ${session.access_token}`,
// 	};
// 	const url = API + URLS.settings + '/cron-all?runnable=true';
// 	const res = await fetch(url, { headers, next: { revalidate: 0 } });

// 	if (!res.ok) return undefined;
// 	const data: Promise<IResSettings> = await res.json();
// 	return data;
// };
