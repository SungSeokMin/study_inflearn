import { IPostImage } from './postImage.model';
import { IUser } from './user.model';

export interface IPost {
	User: IUser;
	postId: number;
	content: string;
	createdAt: Date;
	Images: IPostImage;
}
