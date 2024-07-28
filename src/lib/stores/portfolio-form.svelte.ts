import type { Portfolio } from '@prisma/client';

function createStore() {
	let _data = $state<Portfolio>({
		id: '',
		authorId: '',
		name: null,
		userId: '',
		user: {
			email: '',
			phone: '',
			session: '',
			photo: null,
			name: null,
			title: null,
			description: null,
			githubUrl: null,
			youtubeUrl: null,
			linkedInUrl: null,
			websiteUrl: null
		},
		achivements: []
	});

	return {
		get data() {
			return _data;
		},
		set data(value) {
			_data = value;
		}
	};
}

export const portfolioFormStore = createStore();
