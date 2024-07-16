import { fetchCarts } from '@/api';

import { ProductType } from '@/types/product.types';

type Props = {
	carts: ProductType[];
};

const CartPage = ({ carts }: Props) => {
	console.log('🔥index: 9줄🔥', carts);
	return <div>장바구니 페이지</div>;
};

export const getServerSideProps = async () => {
	const { data } = await fetchCarts();

	return {
		props: {
			carts: data,
		},
	};
};
export default CartPage;
