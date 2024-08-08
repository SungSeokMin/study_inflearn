import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import PostRecommends from './_component/PostRecommends';

import { getPostRecommends } from './_lib/getPostRecommends';

import style from './home.module.css';

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

					<PostRecommends />
				</main>
			</TabProvider>
		</HydrationBoundary>
	);
};

export default HomePage;
