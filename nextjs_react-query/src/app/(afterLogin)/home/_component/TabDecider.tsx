'use client';

import { useContext } from 'react';

import { TabContext } from './TabProvider';

import PostRecommends from './PostRecommends';
import FollowingPosts from './FollowingPosts';

type Props = {};

const TabDecider = ({}: Props) => {
	const { tab } = useContext(TabContext);

	return tab === 'rec' ? <PostRecommends /> : <FollowingPosts />;
};

export default TabDecider;
