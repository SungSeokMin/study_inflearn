"use client";

import Trend from "@/app/(afterLogin)/_component/trendSection/Trend";
import styles from "./trendSection.module.css";
import { usePathname } from "next/navigation";

interface TrendSectionProps {}

const TrendSection = ({}: TrendSectionProps) => {
  const pathname = usePathname();

  if (pathname === "/explore") return null;

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
};

export default TrendSection;
