'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useMutation } from '@tanstack/react-query';

import cx from 'classnames';

import useFollow from '../_hooks/useFollow';

import { IUser } from '@/model/user.model';

import style from './FollowButton.module.css';

type Props = {
	user: IUser;
};

const FollowButton = ({ user }: Props) => {
	const { data: session } = useSession();

	const followed = !!user.Followers?.find((v) => v.userId === session?.user?.email);

	const router = useRouter();

	const { onFetch, onFollow, onUnFollow } = useFollow(user.id);

	const followMutate = useMutation({
		mutationFn: () => onFetch('post'),
		onMutate: onFollow,
		onError: onUnFollow,
	});

	const unFollowMutate = useMutation({
		mutationFn: () => onFetch('delete'),
		onMutate: onUnFollow,
		onError: onFollow,
	});

	const onClick = () => {
		if (!session?.user) {
			router.replace('/login');
		}

		if (followed) {
			unFollowMutate.mutate();
		} else {
			followMutate.mutate();
		}
	};

	return (
		<button className={cx(style.container, followed && style.followed)} onClick={onClick}>
			{followed ? '팔로잉' : '팔로우'}
		</button>
	);
};

export default FollowButton;
