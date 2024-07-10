import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div>
			<nav>
				<Link href="/home">Home</Link> | <Link href="/login">Login</Link>
			</nav>

			<div>{children}</div>
		</div>
	);
};

export default Layout;
