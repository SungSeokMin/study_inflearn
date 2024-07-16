import Image from 'next/image';

import { ProductType } from '@/types/product.types';

import styles from './CartList.module.css';
import { removeCartItem } from '@/api';
import { useRouter } from 'next/router';

type Props = {
	carts: ProductType[];
};

const CartList = ({ carts }: Props) => {
	const router = useRouter();

	const removeCart = async (id: string) => {
		const { data } = await removeCartItem(id);

		alert(`${data.name} 삭제가 되었습니다.`);

		router.replace(router.asPath);
	};

	const totalPrice = carts.reduce((acc, cur) => acc + Number(cur.price), 0);
	const totalQuantity = carts.length;
	return (
		<>
			<div>
				<ul>
					{carts.map(cart => (
						<li className={styles.item} key={cart.id}>
							<div>
								<Image
									src={cart.imageUrl}
									alt={cart.name}
									width={75}
									height={75}
								/>
							</div>

							<div>
								<div>{cart.name}</div>
								<div>{cart.price}</div>
								<button onClick={() => removeCart(cart.id)}>삭제하기</button>
							</div>
						</li>
					))}
				</ul>
			</div>

			<div>
				<p>총 가격 : {totalPrice}</p>

				<p>총 수량 : {totalQuantity}</p>
			</div>
		</>
	);
};

export default CartList;
