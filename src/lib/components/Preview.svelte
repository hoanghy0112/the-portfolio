<script lang="ts">
	import type { Portfolio } from '@prisma/client';
	import { onMount } from 'svelte';

	type Props = {
		data: Portfolio;
		theme: string;
	};

	const { data, theme = 'default' }: Props = $props();

	let Template = $state<any>();

	onMount(async () => {
		Template = (await import(`$lib/templates/${theme}.svelte`)).default;
	});
</script>

{#if Template}
	<svelte:component this={Template} {data} />
{/if}
