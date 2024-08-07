import NextAuth from 'next-auth';
import credentaialProvider from 'next-auth/providers/credentials';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
} = NextAuth({
	pages: {
		signIn: '/i/flow/login',
		newUser: '/i/flow/signup',
	},
	providers: [
		credentaialProvider({
			authorize: async (credentials) => {
				const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: credentials.username,
						password: credentials.password,
					}),
				});

				if (!authResponse.ok) return null;

				const user = await authResponse.json();

				return user;
			},
		}),
	],
});
