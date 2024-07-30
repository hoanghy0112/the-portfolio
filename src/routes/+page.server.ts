import prisma from '$lib/prisma.js';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, cookies }) {
	const { user } = await parent();

	if (!user) {
		cookies.delete('session', { path: '/' });
		throw redirect(307, '/welcome');
	}

	const projects = await prisma.project.findMany({ where: { authorId: user.id } });

	return { projects };
}
