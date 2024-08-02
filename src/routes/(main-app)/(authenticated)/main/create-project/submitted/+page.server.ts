import { redirect, type Actions } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { Project } from '@prisma/client';
import { uploadFileToS3 } from '$lib/aws/s3.js';

export async function load({ url }) {
	const projectId = url.searchParams.get('id');

	if (!projectId) throw redirect(303, '/');

	const project = await prisma.project.findFirst({ where: { id: projectId } });

	if (!project) throw redirect(303, '/');

	return { project };
}

export const actions = {
	default: async ({ request, locals, url }) => {
		const response = await request.formData();
		const data = JSON.parse(response.get('data') as string) as Project;
		const files = response.getAll('images[]') as File[];

		const fileUrls = await Promise.all(files.map((file) => uploadFileToS3(file)));

		if (!locals.user) redirect(403, '/');

		if (url.searchParams.get('isEdit')) {
			const { id, ...updatedData } = data;
			const project = await prisma.project.update({
				where: { id },
				data: {
					...updatedData,
					photos: [...data.photos, ...fileUrls],
					startDate: updatedData.startDate?.toISOString?.(),
					endDate: updatedData.endDate?.toISOString?.()
				}
			});

			return redirect(
				303,
				`/main/create-project/submitted?isEdit=true&id=${project.id}&redirect-url=${url.searchParams.get('redirect-url')}`
			);
		}

		const project = await prisma.project.create({
			data: {
				name: data.name,
				authorId: locals.user.id,
				description: data.description,
				photos: fileUrls,
				demoUrl: data.demoUrl,
				repoUrls: data.repoUrls,
				memberNum: data.memberNum,
				startDate: data.startDate?.toISOString?.(),
				endDate: data.endDate?.toISOString?.(),
				skills: data.skills,
				features: data.features
			}
		});

		redirect(
			303,
			`/main/create-project/submitted?id=${project.id}&redirect-url=${url.searchParams.get('redirect-url')}`
		);
	}
} satisfies Actions;
