import prisma from '$lib/prisma.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	const project = await prisma.project.findFirst({ where: { id: params.id } });

	if (!project) throw error(404, { message: 'Project not found' });

	return json(project);
}
