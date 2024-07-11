import { GetServerSidePropsContext } from 'next';

import axios from 'axios';

import ProductHeader from '@/components/ProductHeader';

import { ProductType } from '@/types/product.types';

type Props = {
	product: ProductType;
};

const ProductDetailPage = ({ product }: Props) => {
	return (
		<div>
			<ProductHeader title="상품 상세 페이지" />

			<p>{product.name}</p>
		</div>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const id = context.params?.productId;

	const response = await axios.get(`http://localhost:4000/products/${id}`);
	const product = response.data;

	return {
		props: { product },
	};
};

export default ProductDetailPage;
