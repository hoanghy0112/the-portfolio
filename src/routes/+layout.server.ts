import prisma from '$lib/prisma.js';

export async function load({ cookies }) {
	const session = cookies.get('session');

	if (!session) return { user: undefined };

	const user = await prisma.user.findFirst({ where: { session } });

	return { user };
}
