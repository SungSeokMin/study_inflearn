import { IPost } from '@/model/post.model';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useRepost = (postId: number) => {
	const queryClient = useQueryClient();

	const { data: session } = useSession();

	const onFetch = (type: 'post' | 'delete') => {
		return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/reposts`, {
			method: type,
			credentials: 'include',
		});
	};

	const onRepost = async (response: Response) => {
		const data = await response.json();
		const queryCache = queryClient.getQueryCache();
		const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

		queryKeys.forEach((queryKey) => {
			if (queryKey[0] === 'posts') {
				const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);
				if (value && 'pages' in value) {
					const obj = value.pages.flat().find((v) => v.postId === postId);
					if (obj) {
						// 존재는 하는지
						const pageIndex = value.pages.findIndex((page) => page.includes(obj));
						const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);

						const shallow = { ...value };
						value.pages = { ...value.pages };
						value.pages[pageIndex] = [...value.pages[pageIndex]];
						shallow.pages[pageIndex][index] = {
							...shallow.pages[pageIndex][index],
							Reposts: [{ userId: session?.user?.email as string }],
							_count: {
								...shallow.pages[pageIndex][index]._count,
								Reposts: shallow.pages[pageIndex][index]._count.Reposts + 1,
							},
						};
						shallow.pages[0].unshift(data);
						queryClient.setQueryData(queryKey, shallow);
					}
				} else if (value) {
					// 싱글 포스트인 경우
					if (value.postId === postId) {
						const shallow = {
							...value,
							Reposts: [{ userId: session?.user?.email as string }],
							_count: {
								...value._count,
								Reposts: value._count.Reposts + 1,
							},
						};
						queryClient.setQueryData(queryKey, shallow);
					}
				}
			}
		});
	};

	const onRemoveRepost = () => {
		const queryCache = queryClient.getQueryCache();
		const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

		queryKeys.forEach((queryKey) => {
			if (queryKey[0] === 'posts') {
				const value: IPost | InfiniteData<IPost[]> | undefined = queryClient.getQueryData(queryKey);
				if (value && 'pages' in value) {
					const obj = value.pages.flat().find((v) => v.postId === postId);
					const repost = value.pages
						.flat()
						.find((v) => v.Original?.postId === postId && v.User.id === session?.user?.email);
					if (obj) {
						// 존재는 하는지
						const pageIndex = value.pages.findIndex((page) => page.includes(obj));
						const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);

						const shallow = { ...value };
						value.pages = { ...value.pages };
						value.pages[pageIndex] = [...value.pages[pageIndex]];
						shallow.pages[pageIndex][index] = {
							...shallow.pages[pageIndex][index],
							Reposts: shallow.pages[pageIndex][index].Reposts.filter(
								(v) => v.userId !== session?.user?.email,
							),
							_count: {
								...shallow.pages[pageIndex][index]._count,
								Reposts: shallow.pages[pageIndex][index]._count.Reposts - 1,
							},
						};
						// 재게시 삭제
						shallow.pages = shallow.pages.map((page) => {
							return page.filter((v) => v.postId !== repost?.postId);
						});
						queryClient.setQueryData(queryKey, shallow);
					}
				} else if (value) {
					// 싱글 포스트인 경우
					if (value.postId === postId) {
						const shallow = {
							...value,
							Reposts: value.Reposts.filter((v) => v.userId !== session?.user?.email),
							_count: {
								...value._count,
								Reposts: value._count.Reposts - 1,
							},
						};
						queryClient.setQueryData(queryKey, shallow);
					}
				}
			}
		});
	};

	return { onFetch, onRepost, onRemoveRepost };
};

export default useRepost;
