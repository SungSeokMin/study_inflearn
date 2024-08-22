'use client';

import { IUser } from '@/model/user.model';
import FollowButton from './FollowButton';

import style from './FollowRecommend.module.css';
import Link from 'next/link';

type Props = {
	user: IUser;
};

const FollowRecommend = ({ user }: Props) => {
	return (
		<Link href={`/${user.id}`} className={style.container}>
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
				<FollowButton user={user} />
			</div>
		</Link>
	);
};

export default FollowRecommend;
