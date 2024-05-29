import BackButton from "@/app/(afterLogin)/_component/backButton/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/searchForm/SearchForm";
import Post from "@/app/(afterLogin)/_component/post/Post";

import styles from "./search.module.css";
import Tab from "@/app/(afterLogin)/search/_component/Tab";

interface Props {
  searchParams: { q: string; f?: string; pf?: string };
}

const page = ({ searchParams }: Props) => {
  return (
    <main className={styles.main}>
      <div className={styles.searchTop}>
        <div className={styles.searchZone}>
          <div className={styles.buttonZone}>
            <BackButton />
          </div>
          <div className={styles.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={styles.list}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        {/*<SearchResult searchParams={searchParams} />*/}
      </div>
    </main>
  );
};

export default page;
