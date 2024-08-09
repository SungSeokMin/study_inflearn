export const getFollowRecommends = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/followRecommends`, {
		next: {
			tags: ['users', 'followRecommends'],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
