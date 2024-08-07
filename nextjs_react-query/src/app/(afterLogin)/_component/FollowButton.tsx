'use client';

import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

import style from './FollowButton.module.css';

type Props = {};

const FollowButton = ({}: Props) => {
	const { data: session } = useSession();

	const router = useRouter();

	const onClick = () => {
		if (!session?.user) {
			router.replace('/login');
		}
	};

	return (
		<button className={style.container} onClick={onClick}>
			팔로우
		</button>
	);
};

export default FollowButton;
