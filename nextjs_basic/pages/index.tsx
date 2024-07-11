import ProductHeader from '@/components/ProductHeader';
import ProductList from '@/components/ProductList';

function ProductPage() {
	return (
		<div>
			<ProductHeader title="상품 목록 페이지" />

			<ProductList />
		</div>
	);
}

export default ProductPage;
