'use client';

import { usePathname } from 'next/navigation';

import Trend from './Trend';

import style from './TrendSection.module.css';

type Props = {};

const TrendSection = ({}: Props) => {
	const pathname = usePathname();

	if (pathname === '/explore') return null;

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
};

export default TrendSection;
