'use client';

import { usePathname } from 'next/navigation';

import { useSession } from 'next-auth/react';

import Trend from './Trend';

import style from './TrendSection.module.css';

type Props = {};

const TrendSection = ({}: Props) => {
	const pathname = usePathname();
	const { data: session } = useSession();

	console.log('🔥TrendSection: 16줄🔥', pathname);

	if (pathname === '/explore') return null;

	if (session?.user) {
		return (
			<div className={style.trendBg}>
				<div className={style.trend}>
					<h3>나를 위한 트렌드</h3>
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
					<Trend />
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
