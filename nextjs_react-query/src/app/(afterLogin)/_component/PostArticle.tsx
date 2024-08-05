'use client';

import { ReactNode } from 'react';

import { PostType } from '../_type/post.types';

import style from './PostArticle.module.css';
import { useRouter } from 'next/navigation';

type Props = {
	children: ReactNode;
	post: PostType;
};

const PostArticle = ({ children, post }: Props) => {
	const router = useRouter();

	const onClick = () => {
		router.push(`/${post.User.id}/status/${post.postId}`);
	};

	return (
		<article className={style.post} onClickCapture={onClick}>
			{children}
		</article>
	);
};

export default PostArticle;
