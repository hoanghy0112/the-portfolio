<script lang="ts">
	import { page } from '$app/stores';
	import Preview from '$lib/components/Preview.svelte';
	import { PORTFOLIO_STEPS } from '$lib/constants/portfolio-step';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte.js';
	import { onMount } from 'svelte';

	const { data, children } = $props();

	const user = $derived(data.user);

	const url = $derived($page.url.pathname);
	const currentPage = $derived(url.split('/').at(3));

	const pageIndex = $derived.by(() => {
		if (!currentPage) return 0;
		return parseInt(currentPage.split('-').at(1) || '0') - 1;
	});

	onMount(() => {
		if (!portfolioFormStore.data.user.email) {
			if (user.name) portfolioFormStore.data.user = user;
		}
	});
</script>

<div class=" w-full flex flex-col gap-12">
	<h1 class=" w-fit font-semibold text-2xl">Create new portfolio</h1>
	<div class=" grid grid-cols-1 lg:grid-cols-2">
		<div class=" grid gap-10">
			<div class=" grid gap-1">
				<p class=" text-foreground-500">Step {pageIndex} of 4</p>
				<p class=" text-foreground-950 text-lg font-medium">{PORTFOLIO_STEPS[pageIndex]}</p>
			</div>
			{@render children()}
		</div>
		<div>
			<Preview data={portfolioFormStore.data} theme="default" />
		</div>
	</div>
</div>
