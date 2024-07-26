import { getAuth, GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth';
import { app } from './app';

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<{ user: User }> => {
	try {
		const result = await signInWithPopup(auth, provider);

		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (!credential || !result) throw new Error('Fail to login');

		// const token = credential.accessToken;
		const user = result.user;

		return { user };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		// const errorCode = error.code;
		const errorMessage = error.message;

		throw new Error(errorMessage);
	}
};
