import { Suspense } from 'react';

import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import Loading from './loading';

import { auth } from '@/auth';

import style from './home.module.css';

// RootLayout -> HomeLayout -> HomePage
const HomePage = async () => {
	const session = await auth();

	return (
		<TabProvider>
			<main className={style.main}>
				<Tab />

				<PostForm me={session} />

				<Suspense fallback={<Loading />}>
					<TabDeciderSuspense />
				</Suspense>
			</main>
		</TabProvider>
	);
};

export default HomePage;
