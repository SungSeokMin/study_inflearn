export const getPostRecommends = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`, {
		next: {
			tags: ['posts', 'recommends'],
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
