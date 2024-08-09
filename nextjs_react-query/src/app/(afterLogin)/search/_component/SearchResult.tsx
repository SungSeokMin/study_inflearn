'use client';

import { useQuery } from '@tanstack/react-query';

import { getSearchResult } from '../_lib/getSearchResult';

import Post from '../../_component/Post';

import { IPost } from '@/model/post.model';

type Props = {
	searchParams: { q: string; f?: string; pf?: string };
};

const SearchResult = ({ searchParams }: Props) => {
	const { data } = useQuery<
		IPost[],
		Object,
		IPost[],
		[_1: string, _2: string, Props['searchParams']]
	>({
		queryKey: ['posts', 'search', searchParams],
		queryFn: getSearchResult,
		staleTime: 60 * 1000,
		gcTime: 300 * 1000,
	});

	return data?.map((post) => <Post post={post} key={post.postId} />);
};

export default SearchResult;
