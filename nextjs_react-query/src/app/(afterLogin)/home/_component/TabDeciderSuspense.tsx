import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import TabDecider from './TabDecider';

import { getPostRecommends } from '../_lib/getPostRecommends';

type Props = {};

const TabDeciderSuspense = async ({}: Props) => {
	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['posts', 'recommends'],
		queryFn: getPostRecommends,
		initialPageParam: 0,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<TabDecider />
		</HydrationBoundary>
	);
};

export default TabDeciderSuspense;