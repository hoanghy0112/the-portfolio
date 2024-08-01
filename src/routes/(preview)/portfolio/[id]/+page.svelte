<script lang="ts">
	import Preview from '$lib/components/Preview.svelte';

	const { data } = $props();

	const portfolio = $derived(data.portfolio);
</script>

<Preview isToggleFullScreen={false} data={portfolio} theme={portfolio.theme} />

<svelte:head>
	<title>{portfolio.user.name} - {portfolio.name}</title>
</svelte:head>
