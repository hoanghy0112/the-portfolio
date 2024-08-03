import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function POST({ params, request, locals }) {
	const { time } = await request.json();

	const view = await prisma.view.create({
		data: {
			portfolioId: params.id,
			projectId: params.projectId,
			time,
			ip: locals.ip,
			clientId: locals.user?.id
		}
	});

	return json({ view }, { status: 200 });
}
