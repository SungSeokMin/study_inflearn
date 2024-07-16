import ProductList from '@/components/product-list/ProductList';
import ProductHeader from '@/components/ProductHeader';

function ProductPage() {
	return (
		<div>
			<ProductHeader title="상품 목록 페이지" />

			<ProductList />
		</div>
	);
}

export default ProductPage;
