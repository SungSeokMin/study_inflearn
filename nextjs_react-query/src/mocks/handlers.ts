import { http, HttpResponse } from 'msw';

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
];
