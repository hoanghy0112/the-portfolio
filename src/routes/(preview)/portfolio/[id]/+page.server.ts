import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const portfolio = await prisma.portfolio.findFirst({ where: { id: params.id } });

	if (!portfolio) throw error(404, 'Portfolio not found');

	return { portfolio };
}
