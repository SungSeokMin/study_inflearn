export type PostType = {
	User: UserType;
	postId: number;
	content: string;
	createdAt: Date;
	Images: any[];
};

type UserType = {
	id: string;
	nickname: string;
	image: string;
};
