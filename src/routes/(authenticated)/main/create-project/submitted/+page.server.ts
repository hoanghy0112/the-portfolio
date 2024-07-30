import { redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Project } from '@prisma/client';

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
		const data = JSON.parse(response.get('data') as string) as Project;

		if (!locals.user) redirect(403, '/');

		const project = await prisma.project.create({
			data: {
				name: data.name,
				authorId: locals.user.id,
				description: data.description,
				demoUrl: data.demoUrl,
				repoUrls: data.repoUrls,
				memberNum: data.memberNum,
				startDate: data.startDate?.toISOString?.(),
				endDate: data.endDate?.toISOString?.(),
				skills: data.skills
			}
		});

		redirect(303, `/main/create-project/submitted?id=${project.id}`);
	}
} satisfies Actions;
