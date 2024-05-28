import SearchForm from "@/app/(afterLogin)/_component/searchForm/SearchForm";
import Trend from "@/app/(afterLogin)/_component/trendSection/Trend";

import styles from "./explore.module.css";

const ExplorePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>

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
      </div>
    </main>
  );
};

export default ExplorePage;
