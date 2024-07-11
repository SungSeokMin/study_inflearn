import { GetServerSidePropsContext } from 'next';

type Props = {};

const ProductDetailPage = ({}: Props) => {
	return <div>ProductDetailPage</div>;
};

export default ProductDetailPage;

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {};
