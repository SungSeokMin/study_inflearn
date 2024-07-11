import { GetServerSidePropsContext } from 'next';

type Props = {
	message: string;
};

const ProductDetailPage = ({ message }: Props) => {
	return <div>{message}</div>;
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	return {
		props: { message: '서버 데이터' },
	};
};

export default ProductDetailPage;
