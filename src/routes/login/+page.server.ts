import { adminAuth } from '$lib/firebase/admin-app';
import prisma from '$lib/prisma.js';
import { error, redirect } from '@sveltejs/kit';
import { FirebaseAuthError } from 'firebase-admin/auth';

export async function load({ cookies, url }) {
	const token = url.searchParams.get('token');

	if (!token) redirect(307, '/');

	try {
		const decodedToken = await adminAuth.verifyIdToken(token);
		const uid = decodedToken.uid;

		const googleUser = await adminAuth.getUser(uid);

		const email = googleUser.email;
		const displayName = googleUser.displayName;
		const photo = googleUser.photoURL || '';

		if (!email) throw new Error('Email not found');

		const session = crypto.randomUUID();

		const user = await prisma.user.findFirst({ where: { uid } });
		if (user) {
			await prisma.user.update({ where: { uid }, data: { session } });
		} else {
			await prisma.user.create({
				data: {
					uid,
					email,
					session,
					name: displayName,
					photo
				}
			});
		}

		cookies.set('session', session, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		if (!user) {
			return { user: { email, name: displayName, photo } };
		}
	} catch (e) {
		if (e instanceof FirebaseAuthError) {
			cookies.delete('session', { path: '/' });
			error(500, { message: e.message });
		}
		if (e instanceof Error) error(500, { message: e.message });
		error(500, { message: 'Unknown error' });
	}

	redirect(303, '/');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const session = cookies.get('session');

		const name = data.get('name')?.toString() || '';

		if (!session) throw new Error('Session not found');

		await prisma.user.updateMany({ where: { session }, data: { name } });

		throw redirect(303, '/');
	}
};
