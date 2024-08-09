'use client';

import { useQuery } from '@tanstack/react-query';

import Trend from '../../_component/Trend';

import { getTrends } from '../../_lib/getTrends';

import { IHashTag } from '@/model/hashtag.model';

type Props = {};

const TrendSection = ({}: Props) => {
	const { data } = useQuery<IHashTag[]>({
		queryKey: ['trends'],
		queryFn: getTrends,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
};

export default TrendSection;
