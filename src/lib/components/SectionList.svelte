<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		children?: Snippet;
	};

	const { title, children }: Props = $props();
</script>

<div class=" flex flex-col gap-4">
	<h2 class=" font-semibold text-2xl">{title}</h2>
	<div class=" w-full overflow-auto flex flex-row gap-4">
		{@render children?.()}
	</div>
</div>
