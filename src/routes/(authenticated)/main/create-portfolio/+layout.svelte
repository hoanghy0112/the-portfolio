<script lang="ts">
	import { page } from '$app/stores';
	import { PORTFOLIO_STEPS } from '$lib/constants/portfolio-step';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte.js';
	import { GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	const { data, children } = $props();

	const user = $derived(data.user);

	const url = $derived($page.url.pathname);
	const currentPage = $derived(url.split('/').at(3));

	const pageIndex = $derived.by(() => {
		if (!currentPage) return 0;
		return parseInt(currentPage.split('-').at(1) || '0') - 1;
	});

	$effect(() => {
		console.log({ user });
	});

	onMount(() => {
		if (user.name) portfolioFormStore.data.userName = user.name;
		if (user.email) portfolioFormStore.data.email = user.email;
	});
</script>

<div class=" w-full flex flex-col gap-12">
	<h1 class=" w-fit font-semibold text-2xl">Create new portfolio</h1>
	<div class=" grid gap-10">
		<div class=" grid gap-1">
			<p class=" text-foreground-500">Step {pageIndex} of 4</p>
			<p class=" text-foreground-950 text-lg font-medium">{PORTFOLIO_STEPS[pageIndex]}</p>
		</div>
		{@render children()}
	</div>
</div>
