import { IUser } from "./user.type";
import { IPostImage } from "@/model/postImage.type";

export interface IPost {
  postId: number;
  content: string;
  createdAt: Date;
  Images: IPostImage[];
  User: IUser;
}
