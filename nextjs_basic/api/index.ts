import axios from 'axios';

import { ProductType } from '@/types/product.types';

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

// 장바구니 추가
const createCartItem = (product: ProductType) => {
	return instance.post('/carts', { ...product });
};

// 장바구니 조회
const fetchCarts = () => {
	return instance.get('/carts');
};

export { createCartItem, fetchProductById, fetchProducts, fetchCarts };
