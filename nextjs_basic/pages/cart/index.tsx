import { fetchCarts } from '@/api';
import CartHeader from '@/components/carts/CartHeader';
import CartList from '@/components/carts/CartList';

import { ProductType } from '@/types/product.types';

type Props = {
	carts: ProductType[];
};

const CartPage = ({ carts }: Props) => {
	return (
		<div>
			<CartHeader />

			<CartList />
		</div>
	);
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
