type Props = {
	productDetail: ProductType;
};

import { ProductType } from '@/types/product.types';

import styles from './Product.module.css';
import Image from 'next/image';

const Product = ({ productDetail }: Props) => {
	console.log('🔥Product: 12줄🔥', productDetail);
	const { id, name, price, imageUrl } = productDetail;

	console.log('🔥Product: 13줄🔥', id);

	return (
		<div>
			<div>
				<Image src={imageUrl} alt={name} width={250} height={250} />
			</div>

			<div>
				<p>{name}</p>
				<p>{price}</p>
			</div>
		</div>
	);
};

export default Product;
