'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async (prevState: any, formData: FormData) => {
	if (!formData.get('id')) {
		return { message: 'no_id' };
	}

	if (!formData.get('name')) {
		return { message: 'no_name' };
	}

	if (!formData.get('password')) {
		return { message: 'no_password' };
	}

	if (!formData.get('image')) {
		return { message: 'no_image' };
	}

	let shouldRedirect = false;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
			method: 'post',
			body: formData,
			credentials: 'include',
		});

		if (response.status === 403) {
			return { message: 'user_exists' };
		}

		await signIn('credentials', {
			username: formData.get('id'),
			password: formData.get('password'),
			redirect: false,
		});

		shouldRedirect = true;
	} catch (err) {
		shouldRedirect = false;
		console.error(err);

		return { message: null };
	}

	if (shouldRedirect) {
		redirect('/home');
	}
};
