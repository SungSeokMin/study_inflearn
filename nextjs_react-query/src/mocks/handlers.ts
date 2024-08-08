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
];
