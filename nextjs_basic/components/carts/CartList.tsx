import Image from 'next/image';

import { ProductType } from '@/types/product.types';

import styles from './CartList.module.css';

import { useRouter } from 'next/router';
import axios from 'axios';

type Props = {
	carts: ProductType[];
};

const CartList = ({ carts }: Props) => {
	const router = useRouter();

	const removeCart = async (id: string) => {
		const { data } = await axios.post('http://localhost:3000/api/carts', {
			id,
		});

		alert(data);

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
