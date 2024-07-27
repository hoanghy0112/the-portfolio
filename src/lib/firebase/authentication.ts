import { getAuth, GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth';
import { app } from './app';

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signInWithGoogle = async (): Promise<{ user: User; token: string }> => {
	try {
		const result = await signInWithPopup(auth, provider);

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
