<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		children?: Snippet;
	};

	const { title, description, children }: Props = $props();
</script>

<div class=" flex flex-col gap-6">
	<div class=" grid gap-1">
		<h2 class=" text-foreground-700 font-semibold text-2xl">{title}</h2>
		{#if description}
			<p class=" text-foreground-500">{description}</p>
		{/if}
	</div>
	{#if children}
		<div class=" py-14 w-full overflow-auto flex flex-row gap-5">
			{@render children()}
		</div>
	{/if}
</div>
