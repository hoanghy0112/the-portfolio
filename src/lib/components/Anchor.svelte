<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		isDisplayed?: boolean;
		fallback?: Snippet;
	}

	const { children, isDisplayed = true, fallback, ...props }: Props = $props();
</script>

{#if isDisplayed}
	<a {...props}>{@render children?.()}</a>
{:else if fallback}
	{@render fallback()}
{/if}
