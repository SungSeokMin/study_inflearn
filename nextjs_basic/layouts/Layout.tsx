import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div>
			<nav>
				<Link href="/">상품 목록</Link> | <Link href="/cart">장바구니</Link>
			</nav>

			<div>{children}</div>
		</div>
	);
};

export default Layout;
