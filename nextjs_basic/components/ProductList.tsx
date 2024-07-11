import { useEffect, useState } from 'react';

import Image from 'next/image';

import axios from 'axios';

import styles from './ProductList.module.css';

type Product = {
	id: string;
	name: string;
	price: string;
	imageUrl: string;
};

const ProductList = () => {
	const [products, setProducts] = useState<null | Product[]>(null);

	useEffect(() => {
		axios
			.get('http://localhost:4000/products')
			.then(response => setProducts(response.data));
	}, []);

	return (
		<ul>
			{products
				? products.map(product => (
						<li className={styles.item} key={product.id}>
							<div>
								<Image
									src={product.imageUrl}
									alt={product.name}
									width={300}
									height={250}
								/>
							</div>

							<div>{product.name}</div>
						</li>
					))
				: null}
		</ul>
	);
};

export default ProductList;
