'use client';

import Image from 'next/image';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import style from './LohoutButton.module.css';

type Props = {};

const LogoutButton = ({}: Props) => {
	const router = useRouter();

	const { data: me } = useSession();

	const onLogout = () => {
		signOut({ redirect: false }).then(() => router.replace('/'));
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
