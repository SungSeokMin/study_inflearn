'use client';

import Image from 'next/image';

import { signOut } from 'next-auth/react';

import style from './LohoutButton.module.css';
import { Session } from 'next-auth';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
	me: Session | null;
};

const LogoutButton = ({ me }: Props) => {
	const queryClient = useQueryClient();

	const onLogout = () => {
		queryClient.invalidateQueries({
			queryKey: ['posts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['users'],
		});

		signOut({ callbackUrl: '/' }).then(() => {
			fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
				method: 'POST',
				credentials: 'include',
			});
		});
	};

	if (!me?.user) {
		return null;
	}

	return (
		<button className={style.logoutButton} onClick={onLogout}>
			<div className={style.logoutUserImage}>
				<Image src={me.user?.image!} alt={me.user?.email!} width={40} height={40} />
			</div>

			<div className={style.logoutUserName}>
				<div>{me.user?.name}</div>
				<div>@{me.user?.email}</div>
			</div>
		</button>
	);
};

export default LogoutButton;
