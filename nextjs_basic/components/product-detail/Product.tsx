import { useRouter } from 'next/router';

import { ProductType } from '@/types/product.types';

import Image from 'next/image';

import styles from './Product.module.css';
import { createCartItem } from '@/api';

type Props = {
	productDetail: ProductType;
};

const Product = ({ productDetail }: Props) => {
	const { id, name, price, imageUrl } = productDetail;

	const router = useRouter();

	const addCart = async () => {
		const response = await createCartItem(productDetail);

		alert('장바구니에 추가되었습니다.');

		router.push('/cart');
	};

	return (
		<div className={styles.container}>
			<div>
				<Image src={imageUrl} alt={name} width={250} height={250} />
			</div>

			<div className={styles.description}>
				<p>{name}</p>

				<p>{price}</p>

				<button onClick={addCart}>장바구니에 담기</button>
			</div>
		</div>
	);
};

export default Product;
