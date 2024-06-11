import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const AuthSession = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSession;
