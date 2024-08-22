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

	let target = post;

	if (post.Original) {
		target = post.Original;
	}

	const onClick = () => {
		router.push(`/${target.User.id}/status/${target.postId}`);
	};

	return (
		<article className={style.post} onClick={onClick}>
			{children}
		</article>
	);
};

export default PostArticle;
