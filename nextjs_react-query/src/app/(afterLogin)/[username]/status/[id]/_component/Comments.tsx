'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import Post from '@/app/(afterLogin)/_component/Post';

import { IPost } from '@/model/post.model';
import { getComments } from '../_lib/getComments';

type Props = {
	id: string;
};

const Comments = ({ id }: Props) => {
	const queryClient = useQueryClient();
	const post = queryClient.getQueryData(['posts', id]);

	const { data: posts } = useQuery<IPost[], Object, IPost[], [_1: string, _2: string, _3: string]>({
		queryKey: ['posts', id, 'comments'],
		queryFn: getComments,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
		enabled: !!post,
	});

	if (post) {
		return posts?.map((post) => <Post post={post} key={post.postId} />);
	}

	return null;
};

export default Comments;
