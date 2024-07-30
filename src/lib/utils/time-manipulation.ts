import moment from 'moment';

export function timeDiffString(date: Date) {
	if (moment().diff(date, 'minutes') < 60) {
		return `${moment().diff(date, 'minutes')} minutes ago`;
	}

	if (moment().diff(date, 'hours') < 24) {
		return `${moment().diff(date, 'hours')} hours ago`;
	}

	if (moment().diff(date, 'days') < 30) {
		return `${moment().diff(date, 'days')} days ago`;
	}

	return `${moment().diff(date, 'months')} months ago`;
}
