import admin, { type ServiceAccount } from 'firebase-admin';
import { serviceAccount } from './service-account';
import { getAuth } from 'firebase-admin/auth';

export const adminApp = admin.initializeApp(
	{
		credential: admin.credential.cert(serviceAccount as ServiceAccount)
	},
	'server'
);

export const adminAuth = getAuth(adminApp);
