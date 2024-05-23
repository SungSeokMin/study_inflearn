import { ReactNode } from "react";

interface AfterLoginLayoutProps {
  children: ReactNode;
}

const AfterLoginLayout = ({ children }: AfterLoginLayoutProps) => {
  return (
    <div>
      <div>AfterLoginLayout</div>
      {children}
    </div>
  );
};

export default AfterLoginLayout;
