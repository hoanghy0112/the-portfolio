import prisma from '$lib/prisma.js';
import type { Project } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ params, locals }) => {
		const user = locals.user;
		const projectId = params.id;

		if (!user) redirect(303, '/');

		const project = await prisma.project.delete({ where: { id: projectId, authorId: user.id } });

		if (!project) fail(403, { message: "You don't have permission to delete this file" });

		return { project: project as Project };
	}
};
