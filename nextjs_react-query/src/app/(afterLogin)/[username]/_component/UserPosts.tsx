'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getUserPosts } from '../_lib/getUserPosts';

import { IPost } from '@/model/post.model';
import Post from '../../_component/Post';

type Props = {
	username: string;
};

const UserPosts = ({ username }: Props) => {
	const { data } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, username: string]>({
		queryKey: ['posts', 'users', username],
		queryFn: getUserPosts,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(['users', username]);

	if (user) {
		return data?.map((post) => <Post post={post} key={post.postId} />);
	}

	return null;
};

export default UserPosts;
