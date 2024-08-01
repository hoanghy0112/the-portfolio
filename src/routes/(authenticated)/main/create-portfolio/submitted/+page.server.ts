import prisma from '$lib/prisma';
import type { Portfolio } from '@prisma/client';
import { error, redirect, type Actions } from '@sveltejs/kit';

export async function load({ url }) {
	const portfolioId = url.searchParams.get('id');

	if (!portfolioId) throw redirect(303, '/');

	const portfolio = await prisma.portfolio.findFirst({ where: { id: portfolioId } });

	if (!portfolio)
		throw error(404, {
			message: 'Portfolio not found'
		});

	return { portfolio };
}

export const actions = {
	default: async ({ request, locals }) => {
		const response = await request.formData();
		const data = JSON.parse(response.get('data') as string) as Portfolio;

		if (!locals.user) return redirect(403, '/');

		const portfolio = await prisma.portfolio.create({
			data: {
				user: {
					name: data.user.name,
					email: data.user.email,
					description: data.user.description,
					title: data.user.title,
					phone: data.user.phone,
					githubUrl: data.user.githubUrl,
					linkedInUrl: data.user.linkedInUrl,
					youtubeUrl: data.user.youtubeUrl
				},
				authorId: locals.user.id,
				name: data.name,
				projectIds: data.projectIds
			}
		});

		return redirect(303, `/main/create-portfolio/submitted?id=${portfolio.id}`);
	}
} satisfies Actions;
