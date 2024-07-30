import type { Project } from '@prisma/client';

function createStore() {
	let _data = $state<Project>({
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
		skills: []
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

export const projectFormStore = createStore();
