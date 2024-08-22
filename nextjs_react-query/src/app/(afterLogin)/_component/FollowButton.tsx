'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import cx from 'classnames';

import useFollow from '../_hooks/useFollow';

import { IUser } from '@/model/user.model';

import style from './FollowButton.module.css';
import { MouseEventHandler } from 'react';
import { Session } from 'next-auth';

type Props = {
	user: IUser;
	session: Session | null;
};

const FollowButton = ({ user, session }: Props) => {
	const followed = !!user.Followers?.find((v) => v.id === session?.user?.email);

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

	const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (!session?.user) {
			router.replace('/login');
		}

		if (followed) {
			unFollowMutate.mutate();
		} else {
			followMutate.mutate();
		}
	};

	if (user.id === session?.user?.email) return null;

	return (
		<button className={cx(style.container, followed && style.followed)} onClick={onClick}>
			{followed ? '팔로잉' : '팔로우'}
		</button>
	);
};

export default FollowButton;
