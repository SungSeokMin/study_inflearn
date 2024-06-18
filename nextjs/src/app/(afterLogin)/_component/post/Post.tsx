import Link from "next/link";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/post/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/post/_component/PostArticle";

import PostImages from "@/app/(afterLogin)/_component/post/_component/PostImages";

import { IPost } from "@/model/post.type";

import style from "./post.module.css";

dayjs.locale("ko");
dayjs.extend(relativeTime);

interface Props {
  post: IPost;
}

const Post = ({ post }: Props) => {
  return (
    <PostArticle post={post}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${post.User.id}`} className={style.postUserImage}>
            <img src={post.User.image} alt={post.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${post.User.id}`}>
              <span className={style.postUserName}>{post.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{post.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(post.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{post.content}</div>
          <div className={style.postImageSection}>
            <PostImages post={post} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
};

export default Post;
