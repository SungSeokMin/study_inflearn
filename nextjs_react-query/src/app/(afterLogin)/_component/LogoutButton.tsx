'use client';

import Image from 'next/image';

import style from './LohoutButton.module.css';

type Props = {};

const LogoutButton = ({}: Props) => {
	const me = {
		// 임시로 내 정보 있는것처럼
		id: 'seokmin',
		nickname: '석민',
		image: '/5Udwvqim.jpg',
	};

	const onLogout = () => {};

	return (
		<button className={style.logoutButton} onClick={onLogout}>
			<div className={style.logoutUserImage}>
				<Image src={me.image} alt={me.id} width={40} height={40} />
			</div>

			<div className={style.logoutUserName}>
				<div>{me.nickname}</div>
				<div>@{me.id}</div>
			</div>
		</button>
	);
};

export default LogoutButton;
