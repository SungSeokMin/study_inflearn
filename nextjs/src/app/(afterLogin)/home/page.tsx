import Tab from "@/app/(afterLogin)/home/_component/tab/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/tabProvider/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/postForm/PostForm";
import Post from "@/app/(afterLogin)/_component/post/Post";

import styles from "./home.module.css";

const HomePage = () => {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />

        <PostForm />

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
        <Post />
      </TabProvider>
    </main>
  );
};

export default HomePage;
