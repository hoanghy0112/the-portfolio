<script lang="ts">
	import { timeDiffString } from '$lib/utils/time-manipulation';
	import type { Portfolio } from '@prisma/client';
	import { scale } from 'svelte/transition';
	import Link from './Link.svelte';

	type Props = { portfolio: Portfolio };

	const { portfolio }: Props = $props();

	let isDeleting = $state(false);
</script>

<div
	class={`group w-full flex flex-col ${isDeleting ? 'blur-md' : 'blur-0'} duration-500`}
	out:scale={{ duration: 300, start: 0.2 }}
>
	<div
		class=" w-full px-6 py-6 rounded-xl overflow-hidden flex flex-col gap-10 bg-white dark:bg-foreground-100 shadow-lg dark:border-[0.5px] dark:border-foreground-400 duration-[600ms]"
	>
		<div class=" h-full bg-white dark:bg-foreground-100 flex flex-col gap-2">
			<Link href="/portfolio/{portfolio.id}" class=" text-foreground-900 text-lg font-semibold">
				{portfolio.name || 'Untitle portfolio'}
			</Link>
			<p class=" text-foreground-600">Updated {timeDiffString(new Date(portfolio.updatedAt))}</p>
		</div>
		<div>
			
		</div>
	</div>
</div>

<style>
</style>
