import { NextResponse } from 'next/server';

import { auth } from './auth';

export const middleware = async () => {
	const session = await auth();

	if (!session) {
		return NextResponse.redirect('http://localhost:3000/i/flow/login');
	}
};

export const config = {
	matcher: ['/compose/tweet', '/home', '/explore', '/messages', '/search'],
};
