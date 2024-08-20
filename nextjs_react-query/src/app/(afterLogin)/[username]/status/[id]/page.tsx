import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import BackButton from '@/app/(afterLogin)/_component/BackButton';
import CommentForm from './_component/CommentForm';

import SinglePost from './_component/SinglePost';
import Comments from './_component/Comments';

import { getSinglePost } from './_lib/getSinglePost';
import { getComments } from './_lib/getComments';

import style from './singlePost.module.css';

type Props = {
	params: { id: string };
};

const SinglePostPage = async ({ params }: Props) => {
	const { id } = params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['posts', id],
		queryFn: getSinglePost,
	});
	await queryClient.prefetchQuery({
		queryKey: ['posts', id, 'comments'],
		queryFn: getComments,
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<div className={style.main}>
				<div className={style.header}>
					<BackButton />
					<h3 className={style.headerTitle}>게시하기</h3>
				</div>
				<SinglePost id={id} />

				<CommentForm id={id} />

				<div>
					<Comments id={id} />
				</div>
			</div>
		</HydrationBoundary>
	);
};

export default SinglePostPage;
