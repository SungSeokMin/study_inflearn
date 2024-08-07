'use client';

import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Main from '../_component/Main';

const LoginRedirectPage = () => {
	const { data: session } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (session?.user) {
			router.replace('/home');
			return;
		}

		router.replace('/i/flow/login');
	}, []);

	return <Main />;
};

export default LoginRedirectPage;
