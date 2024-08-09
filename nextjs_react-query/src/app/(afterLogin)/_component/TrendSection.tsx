'use client';

import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { useQuery } from '@tanstack/react-query';

import Trend from './Trend';

import { getTrends } from '../_lib/getTrends';

import style from './TrendSection.module.css';
import { IHashTag } from '@/model/hashtag.model';

type Props = {};

const TrendSection = ({}: Props) => {
	const pathname = usePathname();
	const { data: session } = useSession();

	const { data } = useQuery<IHashTag[]>({
		queryKey: ['trends'],
		queryFn: getTrends,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
		enabled: !!session?.user,
	});

	if (pathname === '/explore') return null;

	if (session?.user) {
		return (
			<div className={style.trendBg}>
				<div className={style.trend}>
					<h3>나를 위한 트렌드</h3>
					{data?.map((trend) => <Trend trend={trend} key={trend.tagId} />)}
				</div>
			</div>
		);
	}

	return (
		<div className={style.trendBg}>
			<div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
		</div>
	);
};

export default TrendSection;
