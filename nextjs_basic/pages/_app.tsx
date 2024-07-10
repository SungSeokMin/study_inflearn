import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<nav>
				<div>
					<Link href="/home">Home</Link>
				</div>

				<div>
					<Link href="/login">Login</Link>
				</div>
			</nav>

			<Component {...pageProps} />
		</div>
	);
}
