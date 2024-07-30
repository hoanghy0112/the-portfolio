import { Actions, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const token = data.get('token') as string;
		const redirectUrl = data.get('redirect_url') as string;

		if (token) cookies.set('github-token', token, { path: '/' });

		redirect(303, redirectUrl || '/');
	}
} satisfies Actions;
