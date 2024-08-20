'use client';

import { useQuery } from '@tanstack/react-query';

import Post from '@/app/(afterLogin)/_component/Post';

import { getSinglePost } from '../_lib/getSinglePost';

import { IPost } from '@/model/post.model';

type Props = {
	id: string;
	noImage?: boolean;
};

const SinglePost = ({ id, noImage }: Props) => {
	const { data: post, error } = useQuery<IPost, Object, IPost, [_1: string, _2: string]>({
		queryKey: ['posts', id],
		queryFn: getSinglePost,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	if (error) {
		return (
			<div
				style={{
					height: 100,
					fontSize: 31,
					fontWeight: 'bold',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
				}}
			>
				게시글을 찾을 수 없습니다.
			</div>
		);
	}

	if (!post) {
		return null;
	}

	return <Post post={post} noImage={noImage} key={post.postId} />;
};

export default SinglePost;
