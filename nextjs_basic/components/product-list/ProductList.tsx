import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { fetchProducts } from '@/api';

import { ProductType } from '@/types/product.types';

import styles from './ProductList.module.css';

const ProductList = () => {
	const [products, setProducts] = useState<null | ProductType[]>(null);

	useEffect(() => {
		fetchProducts().then(response => setProducts(response.data));
	}, []);

	return (
		<ul>
			{products
				? products.map(product => (
						<li className={styles.item} key={product.id}>
							<Link href={`/products/${product.id}`}>
								<div>
									<Image
										src={product.imageUrl}
										alt={product.name}
										width={300}
										height={250}
									/>
								</div>

								<div>{product.name}</div>
							</Link>
						</li>
					))
				: null}
		</ul>
	);
};

export default ProductList;
