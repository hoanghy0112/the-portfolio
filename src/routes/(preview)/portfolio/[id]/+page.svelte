<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import { onMount } from 'svelte';

	const { data } = $props();

	const portfolio = $derived(data.portfolio);

	onMount(() => {
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
			fetch('', { method: 'put', body: JSON.stringify({ time: timer }), keepalive: true });
		};

		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);
		window.addEventListener('beforeunload', unload);

		return () => {
			window.removeEventListener('focus', onFocus);
			window.removeEventListener('blur', onBlur);
			window.removeEventListener('beforeunload', unload);
		};
	});
</script>

<Preview isToggleFullScreen={false} data={portfolio} theme={portfolio.theme} />

<svelte:head>
	<title>{portfolio.user.name} - {portfolio.name}</title>
</svelte:head>
