<script>
	import { goto } from '$app/navigation';
	import CardCreateButton from '$lib/components/CardCreateButton.svelte';
	import PortfolioItem from '$lib/components/PortfolioItem.svelte';
	import ProjectItemPreview from '$lib/components/ProjectItemPreview.svelte';
	import SectionList from '$lib/components/SectionList.svelte';
	import { GradientButton } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';

	const { data } = $props();
</script>

<div class=" px-4 lg:px-16 pt-8 flex-1 flex flex-col gap-16">
	<SectionList
		title="Your Projects"
		description="All your projects which you have added to your portfolio"
	>
		<CardCreateButton
			title="Create new project"
			description="Import your github repo, describe about it"
			onclick={() => goto('/main/create-project')}
		/>
		{#each data.projects as project (project.id)}
			<div class=" flex" animate:flip={{ duration: 300 }}>
				<ProjectItemPreview {project} />
			</div>
		{/each}
	</SectionList>
	<SectionList
		title="Your Porfolios"
		direction="vertical"
		description="All portfolios created by you, click to view its detail information"
	>
		<GradientButton
			shadow
			onclick={() => goto('/main/create-portfolio')}
			color="cyanToBlue"
			class=" w-fit"
		>
			Create new portfolio
		</GradientButton>
		{#each data.portfolios as portfolio (portfolio.id)}
			<div class=" flex" animate:flip={{ duration: 300 }}>
				<PortfolioItem {portfolio} />
			</div>
		{/each}
	</SectionList>
</div>

<style>
</style>
