<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		isDisplayed?: boolean;
		fallback?: Snippet;
	}

	const { children, isDisplayed = true, fallback, ...props }: Props = $props();
</script>

{#if isDisplayed}
	<p {...props}>{@render children?.()}</p>
{:else if fallback}
	{@render fallback()}
{/if}
