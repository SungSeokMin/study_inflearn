import { IPost } from '@/model/post.model';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useHeart = (post: IPost) => {
	const queryClient = useQueryClient();

	const { data: session } = useSession();

	const onFetch = (type: 'post' | 'delete') => {
		return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/heart`, {
			method: type,
			credentials: 'include',
		});
	};

	const onHeart = () => {
		const queryCache = queryClient.getQueryCache();
		const queryKeys = queryCache.getAll().map((cahce) => cahce.queryKey);

		queryKeys.forEach((queryKey) => {
			if (queryKey[0] === 'posts') {
				const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);

				if (value && 'pages' in value) {
					const obj = value.pages.flat().find((v) => v.postId === post.postId);
					if (obj) {
						const pageIndex = value.pages.findIndex((page) => page.includes(obj));
						const index = value.pages[pageIndex].findIndex((v) => v.postId === post.postId);

						const shallow = { ...value };
						value.pages = { ...value.pages };
						value.pages[pageIndex] = { ...value.pages[pageIndex] };

						shallow.pages[pageIndex][index] = {
							...shallow.pages[pageIndex][index],
							Hearts: [{ userId: session?.user?.email as string }],
							_count: {
								...shallow.pages[pageIndex][index]._count,
								Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
							},
						};

						queryClient.setQueryData(queryKey, shallow);
					}
				} else if (value) {
					if (value.postId === post.postId) {
						const shallow = {
							...value,
							Hearts: [{ userId: session?.user?.email as string }],
							_count: {
								...value._count,
								Hearts: value._count.Hearts + 1,
							},
						};

						queryClient.setQueryData(queryKey, shallow);
					}
				}
			}
		});
	};

	const onUnHeart = () => {
		const queryCache = queryClient.getQueryCache();
		const queryKeys = queryCache.getAll().map((cahce) => cahce.queryKey);

		queryKeys.forEach((queryKey) => {
			if (queryKey[0] === 'posts') {
				const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);

				if (value && 'pages' in value) {
					const obj = value.pages.flat().find((v) => v.postId === post.postId);
					if (obj) {
						const pageIndex = value.pages.findIndex((page) => page.includes(obj));
						const index = value.pages[pageIndex].findIndex((v) => v.postId === post.postId);

						const shallow = { ...value };
						value.pages = { ...value.pages };
						value.pages[pageIndex] = { ...value.pages[pageIndex] };

						shallow.pages[pageIndex][index] = {
							...shallow.pages[pageIndex][index],
							Hearts: shallow.pages[pageIndex][index].Hearts.filter(
								(v) => v.userId !== session?.user?.email,
							),
							_count: {
								...shallow.pages[pageIndex][index]._count,
								Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
							},
						};

						queryClient.setQueryData(queryKey, shallow);
					}
				} else if (value) {
					if (value.postId === post.postId) {
						const shallow = {
							...value,
							Hearts: value.Hearts.filter((v) => v.userId !== session?.user?.email),
							_count: {
								...value._count,
								Hearts: value._count.Hearts - 1,
							},
						};

						queryClient.setQueryData(queryKey, shallow);
					}
				}
			}
		});
	};

	const onInvalidate = () => {
		queryClient.invalidateQueries({
			queryKey: ['posts'],
		});
	};

	return { onFetch, onHeart, onUnHeart, onInvalidate };
};

export default useHeart;
