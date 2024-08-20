import { IPost } from '@/model/post.model';
import { QueryFunction } from '@tanstack/react-query';

type QueryKeyType = QueryFunction<IPost[], [_1: string, _2: string, username: string]>;

export const getUserPosts: QueryKeyType = async ({ queryKey }) => {
	const [_1, _2, username] = queryKey;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}/posts`, {
		next: {
			tags: ['posts', 'users', username],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
