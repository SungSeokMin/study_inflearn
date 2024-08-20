import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';

import { getUser } from './_lib/getUser';
import { getUserPosts } from './_lib/getUserPosts';

import style from './profile.module.css';

type Props = {
	params: { username: string };
};

const ProfilePage = async ({ params }: Props) => {
	const { username } = params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['users', username],
		queryFn: getUser,
	});
	await queryClient.prefetchQuery({
		queryKey: ['posts', 'users', username],
		queryFn: getUserPosts,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<main className={style.main}>
				<UserInfo username={username} />

				<div>
					<UserPosts username={username} />
				</div>
			</main>
		</HydrationBoundary>
	);
};

export default ProfilePage;
