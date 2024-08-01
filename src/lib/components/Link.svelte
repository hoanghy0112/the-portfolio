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
	class={twMerge(' w-fit relative flex gap-2 font-medium text-foreground-800 cursor-pointer', className)}
	data-sveltekit-preload-data="hover"
	{href}
>
	{@render children?.()}
	<Icon icon="ion:arrow-up-right-box-outline" class="text-lg absolute -right-2 top-0 translate-x-full" />
</a>
