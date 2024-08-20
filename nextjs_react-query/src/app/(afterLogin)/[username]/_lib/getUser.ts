import { QueryFunction } from '@tanstack/react-query';

import { IUser } from '@/model/user.model';

type QueryKeyType = QueryFunction<IUser, [_1: string, _2: string]>;

export const getUser: QueryKeyType = async ({ queryKey }) => {
	const [_1, username] = queryKey;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`, {
		next: {
			tags: ['users', username],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
