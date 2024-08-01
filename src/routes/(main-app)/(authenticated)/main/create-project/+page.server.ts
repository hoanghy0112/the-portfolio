import { uploadFileToS3 } from '$lib/aws/s3';
import type { Repo } from '$lib/types/repo.js';
import type { Feature } from '@prisma/client';
import type { Actions } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function load({ cookies, url }) {
	const token = cookies.get('github-token');
	const selectOrganization = url.searchParams.get('organization');

	if (!token) {
		return {
			githubUser: null,
			repos: []
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

	if (!selectOrganization) {
		return {
			githubToken: token,
			githubUser: user.data,
			repos: []
		};
	}

	const repos = await octokit.request(
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

	return {
		githubToken: token,
		githubUser: user.data,
		repos: repos.data as Repo[]
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
