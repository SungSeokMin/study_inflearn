import Link from 'next/link';

import style from './Trend.module.css';
import { IHashTag } from '@/model/hashtag.model';

type Props = {
	trend: IHashTag;
};

const Trend = ({ trend }: Props) => {
	return (
		<Link href={`/search?q=${encodeURIComponent(trend.title)}`} className={style.container}>
			<div className={style.count}>실시간 트렌드</div>
			<div className={style.title}>{trend.title}</div>
			<div className={style.count}>{trend.count.toLocaleString()} posts</div>
		</Link>
	);
};

export default Trend;
