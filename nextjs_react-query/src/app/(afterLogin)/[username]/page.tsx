import BackButton from '../_component/BackButton';
import FollowButton from '../_component/FollowButton';
import Post from '../_component/Post';

import style from './profile.module.css';

type Props = {};

const ProfilePage = ({}: Props) => {
	const user = {
		id: 'zerohch0',
		nickname: '제로초',
		image: '/5Udwvqim.jpg',
	};

	return (
		<main className={style.main}>
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
			<div>
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</main>
	);
};

export default ProfilePage;
