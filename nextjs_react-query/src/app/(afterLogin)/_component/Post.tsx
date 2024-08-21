import Link from 'next/link';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

import ActionButtons from './ActionButtons';
import PostArticle from './PostArticle';
import PostImages from './PostImages';

import { IPost } from '../../../model/post.model';

import style from './Post.module.css';
import { MouseEventHandler } from 'react';

dayjs.extend(relativeTime);
dayjs.locale('ko');

type Props = {
	post: IPost;
	noImage?: boolean;
};

const Post = ({ post, noImage }: Props) => {
	const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
		e.stopPropagation();
	};

	return (
		<PostArticle post={post}>
			<div className={style.postWrapper}>
				<div className={style.postUserSection}>
					<Link href={`/${post.User.id}`} className={style.postUserImage} onClick={stopPropagation}>
						<img src={post.User.image} alt={post.User.nickname} />
						<div className={style.postShade} />
					</Link>
				</div>
				<div className={style.postBody}>
					<div className={style.postMeta}>
						<Link href={`/${post.User.id}`} onClick={stopPropagation}>
							<span className={style.postUserName}>{post.User.nickname}</span>
							&nbsp;
							<span className={style.postUserId}>@{post.User.id}</span>
							&nbsp; · &nbsp;
						</Link>
						<span className={style.postDate}>{dayjs(post.createdAt).fromNow(true)}</span>
					</div>
					<div>{post.content}</div>

					{!noImage ? (
						<div>
							<PostImages post={post} />
						</div>
					) : null}

					<ActionButtons post={post} />
				</div>
			</div>
		</PostArticle>
	);
};

export default Post;
