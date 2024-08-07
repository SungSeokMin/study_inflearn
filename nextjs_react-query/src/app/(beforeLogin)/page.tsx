import { auth } from '@/auth';
import Main from './_component/Main';
import { redirect } from 'next/navigation';

const RootPage = async () => {
	const session = await auth();

	if (session?.user) {
		redirect('home');
	}

	return <Main />;
};

export default RootPage;
