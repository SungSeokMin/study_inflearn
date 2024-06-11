"use client";

import Trend from "@/app/(afterLogin)/_component/trendSection/Trend";
import styles from "./trendSection.module.css";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface TrendSectionProps {}

const TrendSection = ({}: TrendSectionProps) => {
  const pathname = usePathname();

  const { data } = useSession();

  if (pathname === "/explore") return null;

  if (data?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trendBg}>
      <div className={styles.noTrend}>"트렌드를 가져올 수 없습니다."</div>
    </div>
  );
};

export default TrendSection;
