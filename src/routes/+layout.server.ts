import prisma from '$lib/prisma.js';

export async function load({ cookies, url }) {
	const session = cookies.get('session');
	const { pathname } = url;

	if (!session) return { user: undefined };

	const user = await prisma.user.findFirst({ where: { session } });

	return { user, pathname };
}
