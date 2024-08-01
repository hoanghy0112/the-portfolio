<script lang="ts">
	import { navigating } from '$app/stores';
	import type { GithubUser } from '$lib/types/github-user';
	import type { IProjectRepo, Repo } from '$lib/types/repo';
	import { ListPlaceholder, Modal } from 'flowbite-svelte';
	import GithubRepo from './GithubRepo.svelte';
	import OrganizationSelectInput from './OrganizationSelectInput.svelte';
	import { fade, slide } from 'svelte/transition';

	type Props = {
		githubToken?: string;
		githubUser?: GithubUser | null;
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
					<div
						in:slide={{ duration: 300, delay: 300 }}
						out:slide={{ duration: 300 }}
						class=" animate-pulse"
					>
						<ListPlaceholder divClass=" m-2" />
					</div>
				{:else}
					{#each repositories as repo (repo.id)}
						<div
							in:slide|global={{ delay: 300, duration: 300 }}
							out:slide|global={{ duration: 300 }}
						>
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
						</div>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</Modal>
