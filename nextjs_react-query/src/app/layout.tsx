import type { Metadata } from 'next';

import '@/app/globals.css';
import MSWComponent from './_component/MSWComponent';
import AuthSession from './_component/AuthSession';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
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
