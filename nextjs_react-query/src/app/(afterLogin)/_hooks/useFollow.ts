import { IUser } from '@/model/user.model';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const useFollow = (userId: string | undefined) => {
	const queryClient = useQueryClient();

	const { data: session } = useSession();

	const onFetch = (type: 'post' | 'delete') => {
		return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
			method: type,
			credentials: 'include',
		});
	};

	const onFollow = () => {
		const value: IUser[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);

		if (value) {
			const index = value.findIndex((v) => v.id === userId);
			const shallow = [...value];

			shallow[index] = {
				...shallow[index],
				Followers: [{ userId: session?.user?.email as string }],
				_count: {
					...shallow[index]._count,
					Followers: shallow[index]._count.Followers + 1,
				},
			};

			queryClient.setQueryData(['users', 'followRecommends'], shallow);
		}
	};

	const onUnFollow = () => {
		const value: IUser[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);

		if (value) {
			const index = value.findIndex((v) => v.id === userId);
			const shallow = [...value];

			shallow[index] = {
				...shallow[index],
				Followers: shallow[index].Followers.filter((v) => v.userId !== session?.user?.email),
				_count: {
					...shallow[index]._count,
					Followers: shallow[index]._count.Followers - 1,
				},
			};

			queryClient.setQueryData(['users', 'followRecommends'], shallow);
		}
	};

	return { onFetch, onFollow, onUnFollow };
};

export default useFollow;
