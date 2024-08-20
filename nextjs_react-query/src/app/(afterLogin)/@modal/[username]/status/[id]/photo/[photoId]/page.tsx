import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { faker } from '@faker-js/faker';

import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';

import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';
import PhotoModalCloseButton from './_component/PhotoModalCloseButton';

import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';

import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';

import style from './photoModal.module.css';
import ImageZone from './_component/ImageZone';

type Props = {
	params: { id: string };
};

const PhotoModalPage = async ({ params }: Props) => {
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
			<div className={style.container}>
				<PhotoModalCloseButton />

				<ImageZone id={id} />

				<div className={style.commentZone}>
					<SinglePost id={id} noImage={true} />

					<CommentForm id={id} />

					<Comments id={id} />
				</div>
			</div>
		</HydrationBoundary>
	);
};

export default PhotoModalPage;
