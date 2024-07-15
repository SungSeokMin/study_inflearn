type Props = {
	productDetail: ProductType;
};

import { ProductType } from '@/types/product.types';

import styles from './Product.module.css';
import Image from 'next/image';

const Product = ({ productDetail }: Props) => {
	const { name, price, imageUrl } = productDetail;

	return (
		<div className={styles.container}>
			<div>
				<Image src={imageUrl} alt={name} width={250} height={250} />
			</div>

			<div className={styles.description}>
				<p>{name}</p>

				<p>{price}</p>

				<button>장바구니에 담기</button>
			</div>
		</div>
	);
};

export default Product;
