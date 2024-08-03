import prisma from '$lib/prisma';
import type { Portfolio } from '@prisma/client';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export async function load({ params }) {
	const portfolio = await prisma.portfolio.findFirst({ where: { id: params.id } });

	if (!portfolio) throw error(404, 'Portfolio not found');

	return { portfolio };
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
