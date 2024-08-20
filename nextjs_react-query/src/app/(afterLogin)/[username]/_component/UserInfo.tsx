'use client';

import { useQuery } from '@tanstack/react-query';

import BackButton from '../../_component/BackButton';
import FollowButton from '../../_component/FollowButton';

import { getUser } from '../_lib/getUser';
import { IUser } from '@/model/user.model';

import style from '../profile.module.css';

type Props = {
	username: string;
};

const UserInfo = ({ username }: Props) => {
	const { data: user, error } = useQuery<IUser, Object, IUser, [_1: string, _2: string]>({
		queryKey: ['users', username],
		queryFn: getUser,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	if (error) {
		return (
			<>
				<div className={style.header}>
					<BackButton />
					<h3 className={style.headerTitle}>프로필</h3>
				</div>
				<div className={style.userZone}>
					<div className={style.userName}>
						<div>@{username}</div>
					</div>
				</div>
				<div
					style={{
						height: 100,
						fontSize: 31,
						fontWeight: 'bold',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					계정이 존재하지 않음
				</div>
			</>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<>
			<div className={style.header}>
				<BackButton />
				<h3 className={style.headerTitle}>{user.nickname}</h3>
			</div>
			<div className={style.userZone}>
				<div className={style.userImage}>
					<img src={user.image} alt={user.id} />
				</div>
				<div className={style.userName}>
					<div>{user.nickname}</div>
					<div>@{user.id}</div>
				</div>
				<FollowButton />
			</div>
		</>
	);
};

export default UserInfo;
