'use client';

import { ReactNode } from 'react';

import { IPost } from '../../../model/post.model';

import style from './PostArticle.module.css';
import { useRouter } from 'next/navigation';

type Props = {
	children: ReactNode;
	post: IPost;
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
