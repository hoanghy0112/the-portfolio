import prisma from '$lib/prisma';

export async function load({ url }) {
	const portfolioId = url.searchParams.get('id');

	if (!portfolioId) return { portfolio: null };

	const portfolio = await prisma.portfolio.findFirst({ where: { id: portfolioId } });

	return { portfolio };
}
