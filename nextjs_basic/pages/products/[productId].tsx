import { GetServerSidePropsContext } from 'next';

import ProductHeader from '@/components/ProductHeader';

import { fetchProductById } from '@/api';

import Product from '@/components/product-detail/Product';

import { ProductType } from '@/types/product.types';

type Props = {
	productDetail: ProductType;
};

const ProductDetailPage = ({ productDetail }: Props) => {
	return (
		<div>
			<ProductHeader title="상품 상세 페이지" />

			<Product productDetail={productDetail} />
		</div>
	);
};

export const getServerSideProps = async (
	context: GetServerSidePropsContext,
) => {
	const id = context.params?.productId as string;

	const { data } = await fetchProductById(id);

	return {
		props: { productDetail: data },
	};
};

export default ProductDetailPage;
