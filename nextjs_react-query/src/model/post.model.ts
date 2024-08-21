import { IPostImage } from './postImage.model';
import { IUser } from './user.model';

interface UserId {
	userId: string;
}

export interface IPost {
	User: IUser;
	postId: number;
	content: string;
	createdAt: Date;
	Images: IPostImage[];
	Hearts: UserId[];
	Reposts: UserId[];
	Comments: UserId[];
	_count: {
		Hearts: number;
		Reposts: number;
		Comments: number;
	};
}
