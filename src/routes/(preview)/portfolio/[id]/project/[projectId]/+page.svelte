<script lang="ts">
	const { data } = $props();

	const project = $derived(data.project);
	const portfolio = $derived(data.portfolio);

	let Template = $state<any>();

	$effect(() => {
		(async () => {
			Template = (await import(`$lib/templates/${portfolio.theme}/project.svelte`)).default;
		})();
	});
</script>

{#if Template}
	<div class=" w-full h-auto flex flex-col">
		<svelte:component this={Template} data={project} --font-size="16px" />
	</div>
{/if}
