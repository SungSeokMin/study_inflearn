interface UserId {
	userId: string;
}

export interface IUser {
	id: string;
	nickname: string;
	image: string;
	Followers: UserId[];
	Followings: UserId[];
	_count: { Followers: number; Followings: number };
}
