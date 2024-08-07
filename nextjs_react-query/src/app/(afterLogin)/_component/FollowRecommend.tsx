'use client';

import FollowButton from './FollowButton';
import style from './FollowRecommend.module.css';

type Props = {};

const FollowRecommend = ({}: Props) => {
	const user = {
		id: 'elonmusk',
		nickname: 'Elon Musk',
		image: '/yRsRRjGO.jpg',
	};

	return (
		<div className={style.container}>
			<div className={style.userLogoSection}>
				<div className={style.userLogo}>
					<img src={user.image} alt={user.id} />
				</div>
			</div>
			<div className={style.userInfo}>
				<div className={style.title}>{user.nickname}</div>
				<div className={style.count}>@{user.id}</div>
			</div>
			<div>
				<FollowButton />
			</div>
		</div>
	);
};

export default FollowRecommend;
