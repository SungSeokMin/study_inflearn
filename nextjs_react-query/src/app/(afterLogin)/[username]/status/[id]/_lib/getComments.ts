import { IPost } from '@/model/post.model';
import { QueryFunction } from '@tanstack/react-query';

type QueryKeyType = QueryFunction<IPost[], [_1: string, _2: string, _3: string]>;

export const getComments: QueryKeyType = async ({ queryKey }) => {
	const [_1, id] = queryKey;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}/comments`, {
		next: {
			tags: ['posts', id, 'comments'],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
