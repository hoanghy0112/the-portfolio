<script lang="ts">
	import { ListPlaceholder, Modal } from 'flowbite-svelte';
	import OrganizationSelectInput from './OrganizationSelectInput.svelte';
	import type { GithubUser } from '$lib/types/github-user';
	import { navigating } from '$app/stores';
	import type { IProjectRepo, Repo } from '$lib/types/repo';
	import GithubRepo from './GithubRepo.svelte';

	type Props = {
		githubToken?: string;
		githubUser?: GithubUser;
		repositories?: Repo[];
		importedRepositories?: IProjectRepo[];
		isOpen?: boolean;
	};

	let {
		isOpen = $bindable(false),
		repositories = [],
		importedRepositories = $bindable([]),
		githubToken,
		githubUser
	}: Props = $props();
</script>

<Modal
	size="md"
	placement="top-center"
	title="Select repositories"
	bind:open={isOpen}
	outsideclose
	classHeader=" !py-2 !bg-background-default"
	classBody=" bg-background-default"
>
	<div class=" grid gap-8">
		<OrganizationSelectInput token={githubToken} {githubUser} />
		{#if repositories.length || $navigating}
			<div class=" rounded-lg overflow-hidden border-[1px] border-foreground-300">
				{#if $navigating}
					<ListPlaceholder divClass=" m-2" />
				{:else}
					{#each repositories as repo (repo.id)}
						<GithubRepo
							{repo}
							isImported={importedRepositories.some((v) => v.id === repo.id)}
							onImport={(repo) => {
								importedRepositories.push(repo);
							}}
							onRemove={(repo) => {
								importedRepositories = importedRepositories.filter((v) => v.id !== repo.id);
							}}
						/>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</Modal>
