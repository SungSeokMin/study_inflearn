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

	return <div>상품 목록</div>;
}

export default ProductPage;
