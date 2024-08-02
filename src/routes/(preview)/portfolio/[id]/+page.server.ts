import prisma from '$lib/prisma';
import type { Portfolio } from '@prisma/client';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

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

export const actions = {
	delete: async ({ params, locals }) => {
		const user = locals.user;
		const portfolioId = params.id;

		if (!user) redirect(303, '/');

		const portfolio = await prisma.portfolio.delete({
			where: { id: portfolioId, authorId: user.id }
		});

		if (!portfolio) fail(403, { message: "You don't have permission to delete this portfolio" });

		return { portfolio: portfolio as Portfolio };
	}
} satisfies Actions;
