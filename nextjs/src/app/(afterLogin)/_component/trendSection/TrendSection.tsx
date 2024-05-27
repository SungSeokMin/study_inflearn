import Trend from "@/app/(afterLogin)/_component/trendSection/Trend";
import styles from "./trendSection.module.css";

interface TrendSectionProps {}

const TrendSection = ({}: TrendSectionProps) => {
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
