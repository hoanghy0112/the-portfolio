import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const id = params.id;

	const authenticatedUserViews = (
		await prisma.view.groupBy({
			by: ['clientId'],
			where: {
				portfolioId: id,
				NOT: {
					clientId: null
				}
			}
		})
	).length;

	const anonymousUserViews = (
		await prisma.view.groupBy({
			by: ['ip'],
			where: {
				portfolioId: id,
				clientId: null
			}
		})
	).length;

	const views = await prisma.view.count({ where: { portfolioId: id } });

	const averageAccessTime = await prisma.view.aggregate({
		_avg: {
			time: true
		},
		where: {
			portfolioId: id
		}
	});

	return json(
		{
			users: authenticatedUserViews + anonymousUserViews,
			views,
			averageAccessTime: averageAccessTime._avg.time
		},
		{ status: 200 }
	);
}
