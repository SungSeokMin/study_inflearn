import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:4000',
});

// 상품 목록 조회
const fetchProducts = () => {
	return instance.get('/products');
};

// 상품 상세 조회
const fetchProductById = (id: string) => {
	return instance.get(`/products/${id}`);
};

export { fetchProductById, fetchProducts };
