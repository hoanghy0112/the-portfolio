import prisma from '$lib/prisma.js';
import { error, json } from '@sveltejs/kit';

export async function PUT({ cookies, request }) {
	const { time } = await request.json();

	const viewId = cookies.get('viewId');

	await prisma.view.update({
		where: { id: viewId },
		data: { time }
	});

	return json({ viewId }, { status: 200 });
}

export async function POST({ locals, params, request }) {
	const { time } = await request.json();

	const portfolio = await prisma.portfolio.findFirst({ where: { id: params.id } });

	if (!portfolio) throw error(404, 'Portfolio not found');

	const ip = locals.ip;
	const user = locals.user;

	const view = await prisma.view.create({
		data: {
			ip,
			clientId: user?.id,
			portfolioId: portfolio.id,
			time
		}
	});

	return json({ view }, { status: 200 });
}
