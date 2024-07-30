'use client';

import { MouseEvent, useContext } from 'react';

import { TabContext } from './TabProvider';

import style from './Tab.module.css';

type Props = {};

const Tab = ({}: Props) => {
	const { tab, setTab } = useContext(TabContext);

	const onClickTab = (event: MouseEvent<HTMLDivElement>) => {
		const id = event.currentTarget.id as 'rec' | 'fol';

		setTab(id);
	};

	return (
		<div className={style.homeFixed}>
			<div className={style.homeText}>홈</div>
			<div className={style.homeTab}>
				<div id="rec" onClick={onClickTab}>
					추천
					<div className={style.tabIndicator} hidden={tab === 'fol'} />
				</div>
				<div id="fol" onClick={onClickTab}>
					팔로우 중
					<div className={style.tabIndicator} hidden={tab === 'rec'} />
				</div>
			</div>
		</div>
	);
};

export default Tab;
