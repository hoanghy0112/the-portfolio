import { redirect } from '@sveltejs/kit';

export async function load({ parent, cookies }) {
	const { user } = await parent();

	if (!user) {
		cookies.delete('session', { path: '/' });
		throw redirect(307, '/welcome');
	}

	return { user };
}
