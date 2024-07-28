import type { Portfolio } from '@prisma/client';

function createStore() {
	let _data = $state<Portfolio>({
		userName: '',
		id: '',
		authorId: '',
		email: '',
		photo: null,
		name: null,
		title: null,
		description: null,
		githubUrl: null,
		youtubeUrl: null,
		linkedInUrl: null,
		websiteUrl: null,
		achivements: [],
		phone: ''
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
