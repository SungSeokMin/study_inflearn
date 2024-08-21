import { Suspense } from 'react';

import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';
import TabDeciderSuspense from './_component/TabDeciderSuspense';

import style from './home.module.css';
import Loading from './loading';

// RootLayout -> HomeLayout -> HomePage
const HomePage = async () => {
	return (
		<TabProvider>
			<main className={style.main}>
				<Tab />

				<PostForm />

				<Suspense fallback={<Loading />}>
					<TabDeciderSuspense />
				</Suspense>
			</main>
		</TabProvider>
	);
};

export default HomePage;
