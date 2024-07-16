import Image from 'next/image';

import { ProductType } from '@/types/product.types';

import styles from './CartList.module.css';

type Props = {
	carts: ProductType[];
};

const CartList = ({ carts }: Props) => {
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
							</div>
						</li>
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
