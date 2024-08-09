export const getFollowingPosts = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/followingPosts`, {
		next: {
			tags: ['posts', 'followings'],
		},
		cache: 'no-store',
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};
