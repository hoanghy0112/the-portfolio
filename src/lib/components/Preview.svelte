<script lang="ts">
	import type { Portfolio } from '@prisma/client';

	type Props = {
		data: Portfolio;
		theme: string;
	};

	const { data, theme = 'default' }: Props = $props();

	let Template = $state<any>();

	$effect(() => {
		(async () => {
			Template = (await import(`$lib/templates/${theme}.svelte`)).default;
		})();
	});
</script>

{#if Template}
	<div class=" rounded-xl">
		<svelte:component this={Template} {data} />
	</div>
{/if}
