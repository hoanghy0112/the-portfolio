<script lang="ts">
	import { timeDiffString } from '$lib/utils/time-manipulation';
	import type { Portfolio } from '@prisma/client';
	import { scale } from 'svelte/transition';
	import Link from './Link.svelte';
	import { onMount } from 'svelte';
	import StatisticField from './StatisticField.svelte';
	import type { PortfolioStatistic } from '$lib/types/portfolio-statistic';
	import OptionButton from './OptionButton.svelte';

	type Props = { portfolio: Portfolio };

	const { portfolio }: Props = $props();

	let isDeleting = $state(false);

	async function getStatisticData(): Promise<PortfolioStatistic> {
		const response = await fetch(`/portfolio/${portfolio.id}/statistic`);
		const data = await response.json();
		return data;
	}
</script>

<div
	class={`group w-full flex flex-col ${isDeleting ? 'blur-md' : 'blur-0'} duration-500`}
	out:scale={{ duration: 300, start: 0.2 }}
>
	<div
		class=" w-full px-6 py-6 rounded-xl overflow-hidden flex flex-col gap-6 bg-white dark:bg-foreground-100 shadow-lg dark:border-[0.5px] dark:border-foreground-400 duration-[600ms]"
	>
		<div class=" h-full bg-white dark:bg-foreground-100 flex flex-col gap-2">
			<Link href="/portfolio/{portfolio.id}" class=" text-foreground-900 text-lg font-semibold">
				{portfolio.name || 'Untitle portfolio'}
			</Link>
			<p class=" text-foreground-600">Updated {timeDiffString(new Date(portfolio.updatedAt))}</p>
		</div>
		<div class=" flex flex-col gap-4 lg:flex-row">
			{#await getStatisticData()}
				<p>Loading...</p>
			{:then data}
				<StatisticField
					title="viewed users"
					number={data.users}
					unit=""
					icon="solar:user-rounded-broken"
					backgroundClass=" bg-purple-200 dark:bg-purple-700"
					primaryClass=" text-purple-600 dark:text-purple-100"
				/>
				<StatisticField
					title="views"
					number={data.views}
					unit=""
					icon="solar:eye-broken"
					backgroundClass=" bg-green-200 dark:bg-green-700"
					primaryClass=" text-green-600 dark:text-green-100"
				/>
				<StatisticField
					title="average view time"
					number={(data.averageAccessTime / 1000).toFixed(1)}
					unit="s"
					icon="solar:clock-circle-broken"
					backgroundClass=" bg-cyan-200 dark:bg-cyan-700"
					primaryClass=" text-cyan-600 dark:text-cyan-100"
				/>
			{/await}
		</div>
		<div class=" absolute top-5 right-5">
			<OptionButton
				bind:isDeleting
				options={[
					{ title: 'Edit', icon: 'solar:pen-broken' },
					{
						title: 'Delete',
						icon: 'solar:trash-bin-minimalistic-2-broken',
						textClass: ' text-red-500',
						href: `/portfolio/${portfolio.id}?/delete`
					}
				]}
			/>
		</div>
	</div>
</div>

<style>
</style>
