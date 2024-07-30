<script>
	import { goto } from '$app/navigation';
	import CardCreateButton from '$lib/components/CardCreateButton.svelte';
	import ProjectItemPreview from '$lib/components/ProjectItemPreview.svelte';
	import SectionList from '$lib/components/SectionList.svelte';
	import { GradientButton } from 'flowbite-svelte';

	const { data } = $props();
</script>

<div class=" px-4 lg:px-16 pt-8 flex-1 grid gap-16">
	<SectionList
		title="Your Projects"
		description="All your projects which you have added to your portfolio"
	>
		<CardCreateButton
			title="Create new project"
			description="Import your github repo, describe about it"
			onclick={() => goto('/main/create-project')}
		/>
		{#each data.projects as project}
			<ProjectItemPreview {project} />
		{/each}
	</SectionList>
	<SectionList title="Your Porfolio">
		<GradientButton onclick={() => goto('/main/create-portfolio')} color="tealToLime">
			Create one
		</GradientButton>
	</SectionList>
</div>
