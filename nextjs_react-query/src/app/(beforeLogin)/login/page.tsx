'use client';

import Main from '../_component/Main';

import { useRouter } from 'next/navigation';

const LoginRedirectPage = () => {
	const router = useRouter();
	router.replace('/i/flow/login');

	return <Main />;
};

export default LoginRedirectPage;
