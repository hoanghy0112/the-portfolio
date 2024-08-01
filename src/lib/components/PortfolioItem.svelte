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
		<!-- <div
			class=" back px-20 flex flex-col justify-center items-stretch gap-4 opacity-0 delay-[200ms] scale-105 z-20 rounded-xl group-hover:opacity-100 absolute w-full h-full top-0 left-0 bg-background-default"
		>
			<Button color="light">Create portfolio</Button>
			<Button color="light">Edit</Button>
			<form
				use:enhance={() => {
					isDeleting = true;
					return async ({ update }) => {
						await update();
					};
				}}
				class=" w-full flex flex-col"
				action={`/main/portfolio/${portfolio.id}?/delete`}
				method="post"
			>
				<Button type="submit" outline color="red">Delete</Button>
			</form>
		</div> -->
	</div>
</div>

<style>
</style>
