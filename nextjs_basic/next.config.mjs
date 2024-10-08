/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.pixabay.com',
				pathname: '/user/**',
			},
		],
	},
};

export default nextConfig;
