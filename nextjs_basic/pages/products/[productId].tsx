import ProductHeader from '@/components/ProductHeader';
import { GetServerSidePropsContext } from 'next';

type Props = {
	message: string;
};

const ProductDetailPage = ({ message }: Props) => {
	return (
		<div>
			<ProductHeader title="상품 상세 페이지" />

			{message}
		</div>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	return {
		props: { message: '서버 데이터' },
	};
};

export default ProductDetailPage;
