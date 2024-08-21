import { IPost } from '@/model/post.model';
import { QueryFunction } from '@tanstack/react-query';

type QueryKeyType = QueryFunction<
	IPost[],
	[_1: string, _2: string, searchParams: { q: string; f?: string; pf?: string }]
>;

export const getSearchResult: QueryKeyType = async ({ queryKey }) => {
	const [_1, _2, searchParams] = queryKey;

	const urlSearchParams = new URLSearchParams(searchParams);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?${urlSearchParams.toString()}`,
		{
			next: {
				tags: ['posts', 'search', searchParams.q],
			},
			credentials: 'include',
			cache: 'no-store',
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
