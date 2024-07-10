import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
	id: string;
	name: string;
	price: string;
	imageUrl: string;
}

function ProductPage() {
	const [products, setProducts] = useState<null | Product[]>(null);

	useEffect(() => {
		axios
			.get('http://localhost:4000/products')
			.then(response => setProducts(response.data));
	}, []);

	if (!products) {
		return <div>상품이 없습니다.</div>;
	}

	return (
		<div>
			<h1>상품목록 페이지</h1>
			<ul>
				{products.map(product => (
					<li key={product.id}>{product.name}</li>
				))}
			</ul>
		</div>
	);
}

export default ProductPage;
