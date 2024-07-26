import Link from 'next/link';

import style from './Trend.module.css';

type Props = {};

const Trend = ({}: Props) => {
	return (
		<Link href={`/search?q=트렌드`} className={style.container}>
			<div className={style.count}>실시간트렌드</div>
			<div className={style.title}>석민</div>
			<div className={style.count}>1,234 posts</div>
		</Link>
	);
};

export default Trend;
