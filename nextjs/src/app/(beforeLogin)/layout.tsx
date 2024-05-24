import { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.css";

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
};

export default Layout;
