import type { Metadata } from 'next';

import '@/app/globals.css';
import MSWComponent from './_component/MSWComponent';
import AuthSession from './_component/AuthSession';

export const metadata: Metadata = {
	title: 'Z. 무슨 일이 일어나고 있나요?',
	description: 'Z.com inspired by X.com',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<MSWComponent />
				<AuthSession>{children}</AuthSession>
			</body>
		</html>
	);
}
