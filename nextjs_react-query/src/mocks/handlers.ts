import { http, HttpResponse } from 'msw';

import { faker } from '@faker-js/faker';

function generateDate() {
	const lastWeek = new Date(Date.now());
	lastWeek.setDate(lastWeek.getDate() - 7);
	return faker.date.between({
		from: lastWeek,
		to: Date.now(),
	});
}

const User = [
	{ id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg' },
	{ id: 'zerohch0', nickname: '제로초', image: '/5Udwvqim.jpg' },
	{ id: 'leoturtle', nickname: '레오', image: faker.image.avatar() },
];

const delay = (ms: number) =>
	new Promise((res) => {
		setTimeout(res, ms);
	});

export const handlers = [
	// 로그인
	http.post('/api/login', () => {
		const cookie = 'connect.sid=msw-cookie;HttpOnly;Path=/';

		return HttpResponse.json(
			{
				id: 'zerocho',
				nickname: '제로초',
				image: '/5Udwvqim.jpg',
			},
			{
				headers: {
					'Set-Cookie': cookie,
				},
			},
		);
	}),
	// 로그아웃
	http.post('/api/logout', () => {
		const cookie = 'connect.sid=;HttpOnly;Path=/;Max-Age=0';

		return new HttpResponse(null, {
			headers: {
				'Set-Cookie': cookie,
			},
		});
	}),
	// 회원가입
	http.post('/api/users', () => {
		const cookie = 'connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0';

		return HttpResponse.text(JSON.stringify('ok'), {
			headers: {
				'Set-Cookie': cookie,
			},
		});

		// return HttpResponse.text(JSON.stringify('user_exists'), { status: 403 });
	}),
	// 추천 게시글
	http.get('/api/postRecommends', ({ request }) => {
		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 2,
				User: User[0],
				content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 3,
				User: User[0],
				content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
				Images: [],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 4,
				User: User[0],
				content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
					{ imageId: 4, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 5,
				User: User[0],
				content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
		]);
	}),
	// 팔로우 게시글
	http.get('/api/followingPosts', ({ request }) => {
		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} following me.`,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 2,
				User: User[0],
				content: `${cursor + 2} following me.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 3,
				User: User[0],
				content: `${cursor + 3} following me.`,
				Images: [],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 4,
				User: User[0],
				content: `${cursor + 4} following me.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
					{ imageId: 4, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 5,
				User: User[0],
				content: `${cursor + 5} following me.`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
		]);
	}),
	// 검색 결과
	http.get('/api/search/:tag', ({ request, params }) => {
		const { tag } = params;

		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} 검색결과 ${tag}`,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 2,
				User: User[0],
				content: `${cursor + 2} 검색결과 ${tag}`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 3,
				User: User[0],
				content: `${cursor + 3} 검색결과 ${tag}`,
				Images: [],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 4,
				User: User[0],
				content: `${cursor + 4} 검색결과 ${tag}`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
					{ imageId: 4, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 5,
				User: User[0],
				content: `${cursor + 5} 검색결과 ${tag}`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
		]);
	}),
	// 유저 정보
	http.get('/api/users/:userId', () => {
		return HttpResponse.json(User[1]);
	}),
	// 내 게시글
	http.get('/api/users/:userId/posts', ({ request, params }) => {
		const { userId } = params;

		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} ${userId}의 게시글`,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 2,
				User: User[0],
				content: `${cursor + 2} ${userId}의 게시글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 3,
				User: User[0],
				content: `${cursor + 3} ${userId}의 게시글`,
				Images: [],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 4,
				User: User[0],
				content: `${cursor + 4} ${userId}의 게시글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
					{ imageId: 4, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 5,
				User: User[0],
				content: `${cursor + 5} ${userId}의 게시글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
		]);
	}),
	// 게시글 상세
	http.get('/api/users/:userId/posts/:postId', ({ request, params }) => {
		const { userId, postId } = params;

		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} ${userId}의 게시글 `,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
		]);
	}),
	// 답글
	http.get('/api/users/:userId/posts/:postId/comments', ({ request, params }) => {
		const { userId, postId } = params;

		const url = new URL(request.url);
		const cursor = parseInt(url.searchParams.get('cursor') as string) || 0;

		return HttpResponse.json([
			{
				postId: cursor + 1,
				User: User[0],
				content: `${cursor + 1} ${userId}의 게시글 ${postId}의 답글`,
				Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 2,
				User: User[0],
				content: `${cursor + 2} ${userId}의 게시글 ${postId}의 답글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 3,
				User: User[0],
				content: `${cursor + 3} ${userId}의 게시글 ${postId}의 답글`,
				Images: [],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 4,
				User: User[0],
				content: `${cursor + 4} ${userId}의 게시글 ${postId}의 답글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
					{ imageId: 4, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
			{
				postId: cursor + 5,
				User: User[0],
				content: `${cursor + 5} ${userId}의 게시글 ${postId}의 답글`,
				Images: [
					{ imageId: 1, link: faker.image.urlLoremFlickr() },
					{ imageId: 2, link: faker.image.urlLoremFlickr() },
					{ imageId: 3, link: faker.image.urlLoremFlickr() },
				],
				createdAt: generateDate(),
			},
		]);
	}),
	// 팔로우 추천
	http.get('/api/followRecommends', () => {
		return HttpResponse.json(User);
	}),
	// 트렌드
	http.get('/api/trends', () => {
		return HttpResponse.json([
			{ tagId: 1, title: '제로초1', count: 1234 },
			{ tagId: 2, title: '제로초2', count: 1234 },
			{ tagId: 3, title: '제로초3', count: 1234 },
			{ tagId: 4, title: '제로초4', count: 1234 },
			{ tagId: 5, title: '제로초5', count: 1234 },
			{ tagId: 6, title: '제로초6', count: 1234 },
			{ tagId: 7, title: '제로초7', count: 1234 },
			{ tagId: 8, title: '제로초8', count: 1234 },
			{ tagId: 9, title: '제로초9', count: 1234 },
		]);
	}),
];
