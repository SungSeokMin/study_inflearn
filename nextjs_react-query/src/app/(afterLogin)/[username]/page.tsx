import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';

import { getUserPosts } from './_lib/getUserPosts';

import style from './profile.module.css';
import { getUserServer } from './_lib/getUserServer';
import { auth } from '@/auth';

type Props = {
	params: { username: string };
};

const ProfilePage = async ({ params }: Props) => {
	const { username } = params;

	const session = await auth();

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', username],
		queryFn: getUserServer,
	});
	await queryClient.prefetchQuery({
		queryKey: ['posts', 'users', username],
		queryFn: getUserPosts,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<main className={style.main}>
				<UserInfo username={username} session={session} />

				<div>
					<UserPosts username={username} />
				</div>
			</main>
		</HydrationBoundary>
	);
};

export default ProfilePage;
