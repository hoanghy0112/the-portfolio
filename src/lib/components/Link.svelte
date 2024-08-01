<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		href: string;
		children?: Snippet;
		class?: string;
	};

	const { children, href, class: className }: Props = $props();
</script>

<a
	target="_blank"
	class={twMerge(' flex gap-2 font-medium text-foreground-800 cursor-pointer', className)}
	data-sveltekit-preload-data="hover"
	{href}
>
	{@render children?.()}
	<Icon icon="ion:arrow-up-right-box-outline" />
</a>
