<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import FormNextButton from '$lib/components/FormNextButton.svelte';
	import GithubRepo from '$lib/components/GithubRepo.svelte';
	import Input from '$lib/components/Input.svelte';
	import ProjectRepo from '$lib/components/ProjectRepo.svelte';
	import Select from '$lib/components/Select.svelte';
	import { signInWithGithub } from '$lib/firebase/authentication';
	import { errorStateGenerator } from '$lib/stores/error-state-generator.svelte';
	import { projectFormStore } from '$lib/stores/project-form.svelte';
	import { Button, GradientButton, ListPlaceholder, Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { draw, scale } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { githubNameToDisplayName } from '$lib/utils/string-manipulation.js';
	import TechnologyInput from '$lib/components/TechnologyInput.svelte';

	const { data } = $props();

	const defaultSelectedOrganization =
		$page.url.searchParams.get('organization') || data.githubUser.login;
	let selectedOrganization = $state(defaultSelectedOrganization);

	const organizations = $derived([
		{ id: data.githubUser.login, title: data.githubUser.login },
		...data.organizations.map((v) => ({ id: v.login, title: v.login }))
	]);

	let isOpen = $state(false);

	let repositories = $state(data.repos.map((v) => ({ ...v, isImported: false })));
	let importedRepositories = $derived(repositories.filter((r) => r.isImported));

	let errors = $derived(errorStateGenerator(4));

	onMount(async () => {
		projectFormStore.data.authorId = data.user.id;
	});

	$effect(() => {
		if (!projectFormStore.data.name && importedRepositories.at(0)?.name) {
			projectFormStore.data.name = githubNameToDisplayName(importedRepositories.at(0)?.name);
		}
		if (!projectFormStore.data.description && importedRepositories.at(0)?.description) {
			projectFormStore.data.description = importedRepositories.at(0)?.description || '';
		}
		if (!projectFormStore.data.demoUrl && importedRepositories.at(0)?.homepage) {
			projectFormStore.data.demoUrl = importedRepositories.at(0)?.homepage || '';
		}
	});

	async function onSigninGithub() {
		const data = await signInWithGithub();
		return data;
	}
</script>

<svelte:head>
	<title>Create new project - ThePortfolio</title>
</svelte:head>

<div class="w-full flex flex-col lg:flex-row gap-8">
	<div class=" flex-1 flex flex-col gap-12">
		<div class=" flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
			<h1 class=" w-fit font-semibold text-2xl">Create new project</h1>
			{#if !data.githubToken}
				<form
					action=""
					method="post"
					use:enhance={async ({ formData }) => {
						const data = await onSigninGithub();
						formData.set('token', data.token);

						return async ({ update }) => {
							await update();
						};
					}}
				>
					<GradientButton shadow type="submit" color="pinkToOrange">
						Sign in with Github
					</GradientButton>
				</form>
			{:else}
				<Button class=" w-fit " on:click={() => (isOpen = true)} shadow color="alternative">
					<p class=" text-foreground-800 font-medium">Import repositories</p>
				</Button>
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
						<Select
							title="Choose organization"
							onSelect={({ id }) => {
								goto(`/main/create-project?organization=${id}`);
							}}
							bind:selected={selectedOrganization}
							items={organizations}
						/>
						<div class=" rounded-lg overflow-hidden border-[1px] border-foreground-300">
							{#if $navigating}
								<ListPlaceholder divClass=" m-2" />
							{:else}
								{#each repositories as repo (repo.id)}
									<GithubRepo {repo} />
								{/each}
							{/if}
						</div>
					</div>
				</Modal>
			{/if}
		</div>
		<div class=" flex-1 grid gap-10">
			<div class=" flex flex-col gap-6">
				<div class=" flex flex-col xl:flex-row gap-8">
					<Input
						class=" flex-1"
						title="Display name"
						bind:value={projectFormStore.data.name}
						name="projectDisplayName"
						bind:error={errors[0]}
						placeholder="Desplay name of the project"
						required
					/>
				</div>
				<Input
					title="Description"
					bind:value={projectFormStore.data.description}
					bind:error={errors[3]}
					placeholder="Describe your project"
					name="projectDescription"
				/>
				<Input
					title="Home page"
					bind:value={projectFormStore.data.demoUrl}
					bind:error={errors[3]}
					placeholder="Your project homepage"
					name="projectHomePage"
				/>
				<TechnologyInput />
			</div>
		</div>
	</div>
	<div class=" flex-1">
		{#if importedRepositories.length}
			<div
				class=" grid gap-8"
				in:scale={{ duration: 300, opacity: 0, start: 0 }}
				out:scale={{ duration: 300, opacity: 0.2, start: 0.2 }}
			>
				{#each importedRepositories as repo (repo.id)}
					<div
						animate:flip={{ duration: 300 }}
						in:scale={{ duration: 300, opacity: 0, start: 0 }}
						out:scale={{ duration: 300, opacity: 0.2, start: 0.2 }}
					>
						<ProjectRepo {repo} />
					</div>
				{/each}
			</div>
		{:else}
			<div
				in:scale={{ duration: 300, opacity: 0, start: 0, delay: 300 }}
				out:scale={{ duration: 300, opacity: 0, start: 0 }}
				class=" flex flex-col items-center gap-4 text-foreground-600"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512"
					><circle
						in:draw={{ duration: 600, delay: 500 }}
						cx="160"
						cy="96"
						r="48"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
					/><circle
						in:draw={{ duration: 600, delay: 500 }}
						cx="160"
						cy="416"
						r="48"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
					/><path
						in:draw={{ duration: 600, delay: 500 }}
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M160 368V144"
					/><circle
						in:draw={{ duration: 600, delay: 500 }}
						cx="352"
						cy="160"
						r="48"
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
					/><path
						in:draw={{ duration: 600, delay: 500 }}
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="32"
						d="M352 208c0 128-192 48-192 160"
					/></svg
				>
				<p class=" mt-4 text-center text-xl text-foreground-600 font-medium">
					There is no repository selected
				</p>
				<Button class=" w-fit " on:click={() => (isOpen = true)} shadow color="alternative">
					<p class=" text-foreground-600 font-medium">Import repositories from Github now</p>
				</Button>
			</div>
		{/if}
	</div>
</div>

<FormNextButton {errors} destinationUrl="/main/create-portfolio/stage-2" />
