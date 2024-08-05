import HomePage from '@/app/(afterLogin)/home/page';

type Props = {
	params: { username: string; id: string; photoId: string };
};

const PhotoPage = ({ params }: Props) => {
	return <HomePage />;
};

export default PhotoPage;
