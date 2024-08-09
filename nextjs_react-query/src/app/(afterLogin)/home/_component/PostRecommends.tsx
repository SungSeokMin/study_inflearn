'use client';

import { useQuery } from '@tanstack/react-query';

import Post from '../../_component/Post';

import { getPostRecommends } from '../_lib/getPostRecommends';

import { IPost } from '../../../../model/post.model';

type Props = {};

const PostRecommends = ({}: Props) => {
	const { data } = useQuery<IPost[]>({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		staleTime: 60 * 1000,
	});

	return data?.map((post) => <Post post={post} key={post.postId} />);
};

export default PostRecommends;
