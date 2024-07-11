import { useEffect, useState } from 'react';

import axios from 'axios';

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
				? products.map(product => <li key={product.id}>{product.name}</li>)
				: null}
		</ul>
	);
};

export default ProductList;
