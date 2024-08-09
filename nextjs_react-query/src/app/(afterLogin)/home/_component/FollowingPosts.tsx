'use client';

import { useQuery } from '@tanstack/react-query';

import Post from '../../_component/Post';

import { getFollowingPosts } from '../_lib/getFollowingPosts';

import { IPost } from '../../../../model/post.model';

type Props = {};

const FollowingPosts = ({}: Props) => {
	const { data } = useQuery<IPost[]>({
		queryKey: ['posts', 'followings'],
		queryFn: getFollowingPosts,
		staleTime: 60 * 1000,
	});

	return data?.map((post) => <Post post={post} key={post.postId} />);
};

export default FollowingPosts;
