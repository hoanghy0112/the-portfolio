import { uploadFileToS3 } from '$lib/aws/s3';
import prisma from '$lib/prisma.js';
import type { Repo } from '$lib/types/repo.js';
import type { Feature, Project } from '@prisma/client';
import type { Actions } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function load({ cookies, url }) {
	const token = cookies.get('github-token');
	const selectOrganization = url.searchParams.get('organization');

	const projectId = url.searchParams.get('id');

	let repos: Repo[] | undefined;
	let project: Project | null = null;

	if (!token) {
		return {
			githubUser: null,
			repos
		};
	}

	const octokit = new Octokit({
		auth: token
	});

	const user = await octokit.request('GET /user', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	if (selectOrganization) {
		const reposReponse = await octokit.request(
			`${
				selectOrganization && selectOrganization != user.data.login
					? 'GET /orgs/{org}/repos'
					: 'GET /users/{org}/repos'
			}?sort=pushed&per_page=100`,
			{
				org: selectOrganization || user.data.login,
				headers: {
					'X-GitHub-Api-Version': '2022-11-28'
				}
			}
		);
		repos = reposReponse.data as Repo[];
	}

	if (projectId) {
		project = await prisma.project.findFirst({ where: { id: projectId } });
		repos = await Promise.all(
			project?.repoUrls.map(async (v) => {
				const response = await octokit.request('GET /repos/{owner}/{repo}', {
					owner: v.name?.split('/')[0] || '',
					repo: v.name?.split('/')[1] || '',
					headers: {
						'X-GitHub-Api-Version': '2022-11-28'
					}
				});
				return response.data as Repo;
			}) || []
		);
	}

	return {
		githubToken: token,
		githubUser: user.data,
		repos,
		project
	};
}

export const actions = {
	feature: async ({ request }) => {
		const formData = await request.formData();

		const title = formData.get('feature-title');
		const description = formData.get('feature-description');
		const demoUrl = formData.get('feature-demo-url');
		const files = formData.getAll('images[]') as File[];

		const photos = await Promise.all(files.map((file) => uploadFileToS3(file)));

		return { title, description, demoUrl, photos } as Feature;
	}
} satisfies Actions;
