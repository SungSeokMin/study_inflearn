import { ProductType } from '@/types/product.types';

type Props = {
	carts: ProductType[];
};

const CartList = ({ carts }: Props) => {
	console.log('🔥CartList: 8줄🔥', carts);
	return (
		<>
			<div>
				<ul>
					{carts.map(cart => (
						<li key={cart.id}>{cart.name}</li>
					))}
				</ul>
			</div>

			<div>
				<p>
					총 가격 : {carts.reduce((acc, cur) => acc + Number(cur.price), 0)}
				</p>
				<p>총 수량 : {carts.length} </p>
			</div>
		</>
	);
};

export default CartList;
