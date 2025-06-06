import useSWR from 'swr';
import { API, URLS } from '../const';
import { getSSession } from '../get-data';

const url = API + URLS.settings;

const fetcher: any = (url: string, token: string) =>
	fetch(url, {
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
			'api-secret': process.env.API_SECRET || '',
		},
	}).then((res) => res.json());

export function useSwrSettings() {
	const { data } = useSWR<ISettings[]>(url, async () => {
		const { access_token } = await getSSession();
		return fetcher(url, access_token!);
	});
	return data;
}
