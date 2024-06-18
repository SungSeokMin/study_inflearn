"use client";

import { useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/post/Post";
import { IPost } from "@/model/post.type";

interface Props {}

const PostRecommends = ({}: Props) => {
  const { data, isLoading } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
  });

  if (isLoading) {
    return <b>로딩중입니다...</b>;
  }

  if (!data) {
    return <b>데이터가 없습니다.</b>;
  }

  return data.map((post) => <Post key={post.postId} post={post} />);
};

export default PostRecommends;
