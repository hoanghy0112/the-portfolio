<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		description?: string;
		children?: Snippet;
		direction?: 'vertical' | 'horizontal';
	};

	const { title, description, children, direction = 'horizontal' }: Props = $props();
</script>

<div class=" flex-1 flex flex-col gap-6">
	<div class=" grid gap-1">
		<h2 class=" text-foreground-700 font-semibold text-2xl">{title}</h2>
		{#if description}
			<p class=" text-foreground-500">{description}</p>
		{/if}
	</div>
	{#if children}
		<div class=" flex-1 -mx-10 p-4 px-10 overflow-x-auto flex flex-col">
			<div class=" flex {direction === 'horizontal' ? 'flex-row' : 'flex-col'} gap-5">
				{@render children()}
			</div>
		</div>
	{/if}
</div>
