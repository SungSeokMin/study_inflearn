import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const AfterLoginLayout = ({ children }: Props) => {
	return <div>에프터 로그인 레이아웃 {children}</div>;
};

export default AfterLoginLayout;
