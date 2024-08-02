import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function PUT({ cookies, request }) {
	const { time } = await request.json();

	const viewId = cookies.get('viewId');

	await prisma.view.update({
		where: { id: viewId },
		data: { time }
	});

	return json({ viewId }, { status: 200 });
}
