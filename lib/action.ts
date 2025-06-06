'use server';

import { cookies } from 'next/headers';
import { signOut } from 'next-auth/react';

export async function fullSignOut() {
	(await cookies()).delete('access_token');
	(await cookies()).delete('role');
	(await cookies()).delete('id');
	signOut();
}
