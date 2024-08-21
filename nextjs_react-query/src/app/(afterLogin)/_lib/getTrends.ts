export const getTrends = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtags/trends`, {
		next: {
			tags: ['trends'],
		},
		credentials: 'include',
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
