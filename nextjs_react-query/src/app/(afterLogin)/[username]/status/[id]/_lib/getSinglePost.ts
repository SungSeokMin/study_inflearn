import { IPost } from '@/model/post.model';
import { QueryFunction } from '@tanstack/react-query';

type QueryKeyType = QueryFunction<IPost, [_1: string, _2: string]>;

export const getSinglePost: QueryKeyType = async ({ queryKey }) => {
	const [_1, id] = queryKey;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
		next: {
			tags: ['posts', id],
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
