import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDmi4SU7cNggapzQtqkLL4iAnonaPPNfR8',
	authDomain: 'the-portfolio-f1433.firebaseapp.com',
	projectId: 'the-portfolio-f1433',
	storageBucket: 'the-portfolio-f1433.appspot.com',
	messagingSenderId: '739383554687',
	appId: '1:739383554687:web:c954ff524fb8ddf1f6054a',
	measurementId: 'G-HTJ198NT7V'
};

export const app = initializeApp(firebaseConfig, 'client');
