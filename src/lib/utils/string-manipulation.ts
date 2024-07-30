export function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function githubNameToDisplayName(value?: string) {
	if (!value) return '';
	return value
		.split('-')
		.map((v) => capitalizeFirstLetter(v))
		.join(' ');
}
