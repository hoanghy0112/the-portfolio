import {
	getAuth,
	GithubAuthProvider,
	GoogleAuthProvider,
	linkWithCredential,
	signInWithPopup,
	signOut,
	type User
} from 'firebase/auth';
import { app } from './app';

const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<{ user: User; token: string }> => {
	try {
		const result = await signInWithPopup(auth, new GoogleAuthProvider());

		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (!credential || !result) throw new Error('Fail to login');

		const user = result.user;
		const token = await user.getIdToken();

		if (!token) throw new Error('Can not find token');

		return { user, token };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// const errorCode = error.code;
		const errorMessage = error.message;

		throw new Error(errorMessage);
	}
};

export const signInWithGithub = async (): Promise<{ user: User; token: string }> => {
	try {
		const provider = new GithubAuthProvider();
		provider.addScope('repo	');
		const result = await signInWithPopup(auth, provider);

		const credential = GithubAuthProvider.credentialFromResult(result);
		if (!credential || !result) throw new Error('Fail to login');

		const user = result.user;
		const token = credential.accessToken;

		if (!token) throw new Error('Can not find token');

		return { user, token };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (error.code === 'auth/account-exists-with-different-credential') {
			const pendingCred = error.credential;
			const result = await signInWithPopup(auth, new GoogleAuthProvider());

			const user = await linkWithCredential(result.user, pendingCred);
			const token = pendingCred.accessToken;

			return { user: user.user, token };
		}
		// const errorCode = error.code;
		const errorMessage = error.message;

		throw new Error(errorMessage);
	}
};

export const signOutFirebase = () => {
	signOut(auth).then(() => {});
};
