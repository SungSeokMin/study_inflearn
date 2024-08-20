'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import Post from '../../_component/Post';

import { getPostRecommends } from '../_lib/getPostRecommends';

import { IPost } from '../../../../model/post.model';

type Props = {};

const PostRecommends = ({}: Props) => {
	const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
		IPost[],
		Object,
		InfiniteData<IPost[]>,
		[_1: string, _2: string],
		number
	>({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	const { ref, inView } = useInView({
		threshold: 0,
		delay: 0,
	});

	useEffect(() => {
		if (inView) !isFetching && hasNextPage && fetchNextPage();
	}, [inView]);

	return (
		<>
			{data?.pages.map((page, i) => (
				<Fragment key={i}>
					{page.map((post) => (
						<Post post={post} key={post.postId} />
					))}
				</Fragment>
			))}

			<div ref={ref} style={{ height: 50 }} />
		</>
	);
};

export default PostRecommends;
