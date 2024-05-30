"use client";

import { ReactNode } from "react";

import styles from "../post.module.css";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  post: {
    postId: number;
    content: string;
    createdAt: Date;
    Images: any[];
    User: {
      id: string;
      nickname: string;
      image: string;
    };
  };
}

const PostArticle = ({ children, post }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article className={styles.post} onClickCapture={onClick}>
      {children}
    </article>
  );
};

export default PostArticle;
