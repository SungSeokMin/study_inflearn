import { ReactNode } from "react";

interface HomeLayout {
  children: ReactNode;
}

const HomeLayout = ({ children }: HomeLayout) => {
  return (
    <div>
      <div>Home Layout</div>
      {children}
    </div>
  );
};

export default HomeLayout;
