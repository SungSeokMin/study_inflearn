'use client';

import { useQuery } from '@tanstack/react-query';

import FollowRecommend from './FollowRecommend';

import { getFollowRecommends } from '../_lib/getFollowRecommends';

import { IUser } from '@/model/user.model';

type Props = {};

const FollowRecommendSection = ({}: Props) => {
	const { data: users } = useQuery<IUser[]>({
		queryKey: ['users', 'followRecommends'],
		queryFn: getFollowRecommends,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	return users?.map((user) => <FollowRecommend user={user} key={user.id} />);
};

export default FollowRecommendSection;
