'use client';

import { useSession } from 'next-auth/react';
import Main from '../_component/Main';

import { useRouter } from 'next/navigation';

const LoginRedirectPage = () => {
	const { data: session } = useSession();

	const router = useRouter();

	if (session?.user) {
		router.replace('/home');
		return null;
	}

	router.replace('/i/flow/login');

	return <Main />;
};

export default LoginRedirectPage;
