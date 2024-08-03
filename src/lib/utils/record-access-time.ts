export function recordAccessTime(onUnLoad: (time: number) => void) {
	let timer = 0;
	let focusTime = new Date();

	const onFocus = () => {
		focusTime = new Date();
	};

	const onBlur = () => {
		timer += new Date().getTime() - focusTime.getTime();
	};

	const unload = () => {
		timer += new Date().getTime() - focusTime.getTime();
		onUnLoad(timer);
	};

	window.addEventListener('focus', onFocus);
	window.addEventListener('blur', onBlur);
	window.addEventListener('beforeunload', unload);

	return () => {
		window.removeEventListener('focus', onFocus);
		window.removeEventListener('blur', onBlur);
		window.removeEventListener('beforeunload', unload);
	};
}
