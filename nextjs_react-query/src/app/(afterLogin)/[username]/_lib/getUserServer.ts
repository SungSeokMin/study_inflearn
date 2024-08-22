import { cookies } from 'next/headers';
import { QueryKeyType } from './getUser';

export const getUserServer: QueryKeyType = async ({ queryKey }) => {
	const [_1, username] = queryKey;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, {
		next: {
			tags: ['users', username],
		},
		credentials: 'include',
		headers: { Cookie: cookies().toString() },
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
