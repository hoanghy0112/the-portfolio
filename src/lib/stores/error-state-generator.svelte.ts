export function errorStateGenerator(quantity: number) {
	const defaultErrors = Array(quantity)
		.fill('')
		.map(() => ({
			message: ''
		}));

	const errors = $state<{ message: string; element?: HTMLInputElement }[]>(defaultErrors);

	return errors;
}
