import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ZLogo from '../../../public/zlogo.png';

import NavMenu from './_component/NavMenu';
import LogoutButton from './_component/LogoutButton';
import TrendSection from './_component/TrendSection';
import FollowRecommend from './_component/FollowRecommend';
import RightSearchZone from './_component/RightSearchZone';

import style from './layout.module.css';

type Props = {
	children: ReactNode;
	modal: ReactNode;
};

const AfterLoginLayout = ({ children, modal }: Props) => {
	return (
		<div className={style.container}>
			<header className={style.leftSectionWrapper}>
				<section className={style.leftSection}>
					<div className={style.leftSectionFixed}>
						<Link className={style.logo} href="/home">
							<div className={style.logoPill}>
								<Image src={ZLogo} alt="z.com로고" width={40} height={40} />
							</div>
						</Link>
						<nav>
							<ul>
								<NavMenu />
							</ul>

							<Link href="/compose/tweet" className={style.postButton}>
								게시하기
							</Link>
						</nav>
						<LogoutButton />
					</div>
				</section>
			</header>

			<div className={style.rightSectionWrapper}>
				<div className={style.rightSectionInner}>
					<main className={style.main}>{children}</main>

					<section className={style.rightSection}>
						<RightSearchZone />
						<TrendSection />

						<div className={style.followRecommend}>
							<h3>팔로우 추천</h3>
							<FollowRecommend />
						</div>
					</section>
				</div>
			</div>

			{modal}
		</div>
	);
};

export default AfterLoginLayout;