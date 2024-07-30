import prisma from '$lib/prisma';

export async function load({ cookies, url }) {
	const session = cookies.get('session');
	const { pathname, searchParams } = url;

	if (!session) return { user: undefined };

	const user = await prisma.user.findFirst({ where: { session } });

	return { user, pathname, isPrev: searchParams.get('prev') };
}
