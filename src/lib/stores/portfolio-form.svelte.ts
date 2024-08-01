import type { Portfolio } from '@prisma/client';

const getDefaultValue = () => ({
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
	achivements: [],
	projectIds: []
});

function createStore() {
	let _data = $state<Portfolio>(getDefaultValue());

	return {
		reset() {
			_data = getDefaultValue();
		},
		get data() {
			return _data;
		},
		set data(value) {
			_data = value;
		}
	};
}

export const portfolioFormStore = createStore();
