import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const AuthSession = ({ children }: Props) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSession;
