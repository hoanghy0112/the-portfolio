import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export async function load({ params, locals, cookies }) {
	const portfolio = await prisma.portfolio.findFirst({ where: { id: params.id } });

	if (!portfolio) throw error(404, 'Portfolio not found');

	const ip = locals.ip;
	const user = locals.user;

	const view = await prisma.view.create({
		data: {
			ip,
			clientId: user?.id,
			portfolioId: portfolio.id
		}
	});

	cookies.set('viewId', view.id, { path: `/portfolio/${portfolio.id}` });

	return { portfolio, view };
}
