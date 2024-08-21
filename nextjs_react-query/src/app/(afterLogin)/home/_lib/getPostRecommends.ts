type Props = {
	pageParam?: number;
};

export const getPostRecommends = async ({ pageParam }: Props) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`,
		{
			next: {
				tags: ['posts', 'recommends'],
			},
			cache: 'no-store',
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
