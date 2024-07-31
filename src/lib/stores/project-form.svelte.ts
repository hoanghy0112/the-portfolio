import type { Project } from '@prisma/client';

const defaultData = {
	id: '',
	authorId: '',
	name: '',
	description: null,
	demoUrl: null,
	memberNum: null,
	startDate: null,
	endDate: null,
	contents: [],
	repoUrls: [],
	tasks: [],
	skills: [],
	photos: [],
	features: []
};

function createStore() {
	let _data = $state<Project>(JSON.parse(JSON.stringify(defaultData)));

	return {
		reset() {
			_data = JSON.parse(JSON.stringify(defaultData));
		},
		get data() {
			return _data;
		},
		set data(value) {
			_data = value;
		}
	};
}

export const projectFormStore = createStore();
