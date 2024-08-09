export const getTrends = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trends`, {
		next: {
			tags: ['trends'],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
