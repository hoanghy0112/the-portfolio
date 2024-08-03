<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';
	import { recordAccessTime } from '$lib/utils/record-access-time.js';
	import { onMount } from 'svelte';

	const { data } = $props();

	const portfolio = $derived(data.portfolio);

	onMount(() => {
		const unsubscribe = recordAccessTime((time) => {
			fetch('', { method: 'post', body: JSON.stringify({ time }), keepalive: true });
		});

		return unsubscribe;
	});
</script>

<Preview isToggleFullScreen={false} data={portfolio} theme={portfolio.theme} />

<svelte:head>
	<title>{portfolio.user.name} - {portfolio.name}</title>
</svelte:head>
