import type { Actions } from '@sveltejs/kit';
import { Octokit } from 'octokit';

export async function load({ cookies, url }) {
	const token = cookies.get('github-token');
	const selectOrganization = url.searchParams.get('organization');

	const octokit = new Octokit({
		auth: token
	});

	const user = await octokit.request('GET /user', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	const organizations = await octokit.request('GET /user/orgs', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

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
		organizations: organizations.data,
		githubUser: user.data,
		repos: repos.data
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const token = data.get('token') as string;

		if (token) cookies.set('github-token', token, { path: '/' });
	}
} satisfies Actions;
