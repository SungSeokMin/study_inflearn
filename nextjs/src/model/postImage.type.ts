import { IPost } from "@/model/post.type";

export interface IPostImage {
  imageId: number;
  link: string;
  Post?: IPost;
}
