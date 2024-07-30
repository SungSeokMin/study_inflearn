import Post from '../_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from './_component/TabProvider';

import style from './home.module.css';

type Props = {};

// RootLayout -> HomeLayout -> HomePage
const HomePage = ({}: Props) => {
	return (
		<TabProvider>
			<main className={style.main}>
				<Tab />

				<PostForm />

				<Post />
				<Post />
				<Post />
				<Post />
				<Post />
			</main>
		</TabProvider>
	);
};

export default HomePage;
