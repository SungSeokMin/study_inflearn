import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import Tab from "@/app/(afterLogin)/home/_component/tab/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/tabProvider/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/postForm/PostForm";

import styles from "./home.module.css";
import PostRecommends from "@/app/(afterLogin)/home/_component/postRecommends/PostRecommends";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

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

          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
};

export default HomePage;
