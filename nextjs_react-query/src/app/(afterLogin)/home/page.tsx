import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Post from '../_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';

import style from './home.module.css';

const getPostRecommends = async () => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`, {
		next: {
			tags: ['posts', 'recommends'],
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json();
};

// RootLayout -> HomeLayout -> HomePage
const HomePage = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<TabProvider>
				<main className={style.main}>
					<Tab />

					<PostForm />

					<Post />
					<Post />
					<Post />
					<Post />
					<Post />
				</main>
			</TabProvider>
		</HydrationBoundary>
	);
};

export default HomePage;
