import prisma from '$lib/prisma';
import type { Portfolio } from '@prisma/client';
import { redirect, type Actions } from '@sveltejs/kit';

export async function load({ url }) {
	const projectId = url.searchParams.get('id');

	if (!projectId) throw redirect(303, '/');

	const project = await prisma.project.findFirst({ where: { id: projectId } });

	if (!project) throw redirect(303, '/');

	return { project };
}

export const actions = {
	default: async ({ request, locals }) => {
		const response = await request.formData();
		const data = JSON.parse(response.get('data') as string) as Portfolio;

		if (!locals.user) redirect(403, '/');

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

		redirect(303, `/main/create-portfolio/submitted?id=${portfolio.id}`);
	}
} satisfies Actions;
