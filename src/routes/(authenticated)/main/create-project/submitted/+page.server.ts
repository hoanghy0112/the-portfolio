import { redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const actions = {
	default: async ({ request, locals }) => {
		const response = await request.formData();
		const data = JSON.parse(response.get('data') as string);

		if (!locals.user) redirect(403, '/');

		await prisma.project.create({
			data: { name: data.name, authorId: locals.user.id }
		});

		redirect(303, '/main/create-project/submitted');
	}
} satisfies Actions;
