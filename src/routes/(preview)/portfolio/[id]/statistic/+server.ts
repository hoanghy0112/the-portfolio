import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
	const id = params.id;

	const portfolio = await prisma.portfolio.findFirst({ where: { id } });

	const visitTimeOfEachProject = await Promise.all(
		portfolio?.projectIds.map(async (projectId) => {
			const project = await prisma.project.findFirst({ where: { id: projectId } });
			const visitTime = await prisma.view.aggregate({
				_sum: {
					time: true
				},
				where: {
					portfolioId: id,
					projectId
				}
			});
			return { project, visitTime: Number(visitTime._sum.time || BigInt(0)) };
		}) || []
	);
	const totalVisitTime = visitTimeOfEachProject.reduce(
		(total, { visitTime }) => total + Number(visitTime),
		0
	);

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
			averageAccessTime: averageAccessTime._avg.time,
			visitTimeOfEachProject: visitTimeOfEachProject,
			totalVisitTime
		},
		{ status: 200 }
	);
}
