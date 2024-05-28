import { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";

import NavMenu from "@/app/(afterLogin)/_component/navMenu/NavMenu";

import LogoutButton from "@/app/(afterLogin)/_component/loginButton/LoginButton";
import TrendSection from "@/app/(afterLogin)/_component/trendSection/TrendSection";
import FollowRecommend from "@/app/(afterLogin)/_component/followRecommend/FollowRecommend";

import styles from "./layout.module.css";
import SearchZone from "@/app/(afterLogin)/_component/searchZone/SearchZone";

interface AfterLoginLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const AfterLoginLayout = ({ children, modal }: AfterLoginLayoutProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href="/home">
              <div className={styles.logoPill}>
                <Image src="/zlogo.png" alt="logo" width={40} height={40} />
              </div>
            </Link>

            <nav>
              <ul>
                <NavMenu />
              </ul>

              <Link href="/compose/tweet" className={styles.postButton}>
                게시하기
              </Link>
            </nav>

            <LogoutButton />
          </div>
        </section>
      </header>

      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
          <section className={styles.rightSection}>
            <SearchZone />

            <TrendSection />

            <div className={styles.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
};

export default AfterLoginLayout;
