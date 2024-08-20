import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import TabDecider from './_component/TabDecider';

import { getPostRecommends } from './_lib/getPostRecommends';

import style from './home.module.css';

// RootLayout -> HomeLayout -> HomePage
const HomePage = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		initialPageParam: 0,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<TabProvider>
				<main className={style.main}>
					<Tab />

					<PostForm />

					<TabDecider />
				</main>
			</TabProvider>
		</HydrationBoundary>
	);
};

export default HomePage;
