import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

// RootLayout -> HomeLayout
const HomeLayout = ({ children }: Props) => {
	return <div>홈 레이아웃 {children}</div>;
};

export default HomeLayout;
