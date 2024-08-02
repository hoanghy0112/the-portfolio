import prisma from '$lib/prisma';

export const handle = async ({ event, resolve }) => {
	const requestIp = event.getClientAddress();

	const session = event.cookies.get('session');

	if (!session) event.locals.user = null;

	const user = await prisma.user.findFirst({ where: { session } });

	event.locals.user = user;
	event.locals.ip = requestIp;

	return await resolve(event);
};
