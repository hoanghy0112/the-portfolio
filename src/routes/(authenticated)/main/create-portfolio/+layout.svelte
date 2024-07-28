<script lang="ts">
	import { page } from '$app/stores';
	import Preview from '$lib/components/Preview.svelte';
	import Select from '$lib/components/Select.svelte';
	import { PORTFOLIO_STEPS } from '$lib/constants/portfolio-step';
	import { TEMPLATES } from '$lib/constants/templates';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const { data, children } = $props();

	let theme = $state('default');

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

<div class="w-full flex-1 flex flex-col lg:flex-row gap-8">
	<div class=" flex-1 flex flex-col gap-12">
		<h1 class=" w-fit font-semibold text-2xl">Create new portfolio</h1>
		<div class=" grid gap-10">
			<div class=" grid gap-1">
				<p class=" text-foreground-500">Step {pageIndex} of 4</p>
				<p class=" text-foreground-950 text-lg font-medium">{PORTFOLIO_STEPS[pageIndex]}</p>
			</div>
			<div class=" flex flex-1">
				{#key data.pathname}
					<div
						in:fly={{ x: data.isPrev ? -200 : 200, duration: 300, delay: 300 }}
						out:fly={{ x: data.isPrev ? 200 : -200, duration: 300 }}
						class=" flex-1 overflow-auto grid gap-10"
					>
						{@render children()}
					</div>
				{/key}
			</div>
		</div>
	</div>
	<div class=" flex-1 flex flex-col gap-4">
		<Select
			bind:selected={theme}
			items={TEMPLATES.map((v) => ({ id: v.name, title: v.displayName }))}
		/>
		<Preview data={portfolioFormStore.data} {theme} />
	</div>
</div>
