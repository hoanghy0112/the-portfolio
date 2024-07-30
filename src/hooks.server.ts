import prisma from '$lib/prisma';

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) event.locals.user = null;

	const user = await prisma.user.findFirst({ where: { session } });

	event.locals.user = user;

	return await resolve(event);
};
