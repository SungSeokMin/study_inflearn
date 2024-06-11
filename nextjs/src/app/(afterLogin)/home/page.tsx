import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Tab from "@/app/(afterLogin)/home/_component/tab/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/tabProvider/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/postForm/PostForm";
import Post from "@/app/(afterLogin)/_component/post/Post";

import styles from "./home.module.css";

const getPostRecommends = async () => {
  const response = await fetch("http://localhost:9090/api/postRecommends", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

const HomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={styles.main}>
      <HydrationBoundary state={dehydratedState}>
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
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
