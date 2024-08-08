import { IPost } from './post.model';

export interface IPostImage {
	link: string;
	imageId: number;
	Post?: IPost;
}
