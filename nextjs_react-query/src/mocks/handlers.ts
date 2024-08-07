import { http, HttpResponse } from 'msw';

export const handlers = [
	// 로그인
	http.post('/api/login', () => {
		const cookie = 'connect.sid=msw-cookie;HttpOnly;Path=/';

		return HttpResponse.json(
			{
				userId: 1,
				nickname: '제로초',
				id: 'zerocho',
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
];
