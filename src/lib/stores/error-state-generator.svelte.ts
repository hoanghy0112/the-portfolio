export function errorStateGenerator(quantity: number) {
	const defaultErrors = Array(quantity)
		.fill('')
		.map(() => ({
			message: ''
		}));

	const errors = $state<TErrorList>(defaultErrors);

	return errors;
}

export type TErrorList = { message: string; element?: HTMLInputElement }[];
