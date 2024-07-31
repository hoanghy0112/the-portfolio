<script lang="ts">
	import { enhance } from '$app/forms';
	import FeatureListInput from '$lib/components/FeatureListInput.svelte';
	import FileListUpload from '$lib/components/FileListUpload.svelte';
	import FormNextButton from '$lib/components/FormNextButton.svelte';
	import GithubRepoSelectModal from '$lib/components/GithubRepoSelectModal.svelte';
	import Input from '$lib/components/Input.svelte';
	import ProjectRepo from '$lib/components/ProjectRepo.svelte';
	import RepositoryIcon from '$lib/components/RepositoryIcon.svelte';
	import TechnologyInput from '$lib/components/TechnologyInput.svelte';
	import { signInWithGithub } from '$lib/firebase/authentication';
	import { errorStateGenerator } from '$lib/stores/error-state-generator.svelte';
	import { projectFormStore } from '$lib/stores/project-form.svelte';
	import type { IProjectRepo } from '$lib/types/repo.js';
	import { githubNameToDisplayName } from '$lib/utils/string-manipulation.js';
	import { Button, GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';

	const { data } = $props();

	let isOpen = $state(false);
	let files = $state<File[]>([]);

	let repositories = $derived(data.repos);
	let importedRepositories = $state<IProjectRepo[]>([]);

	let errors = $derived(errorStateGenerator(1));

	onMount(async () => {
		projectFormStore.reset();
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

	$effect(() => {
		projectFormStore.data.repoUrls = importedRepositories.map((v) => ({
			url: v.html_url,
			name: v.full_name,
			description: v.description
		}));
	});

	async function onSigninGithub() {
		const data = await signInWithGithub();
		return data;
	}
</script>

<svelte:head>
	<title>Create new project - ThePortfolio</title>
</svelte:head>

<div
	class=" flex flex-col gap-14 px-4 py-8 lg:px-8 lg:py-12 rounded-2xl bg-white dark:bg-transparent shadow-lg dark:shadow-none"
>
	<div class=" flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
		<div class=" flex-1 flex flex-col gap-12">
			<div class=" flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
				<h1 class=" w-fit font-semibold text-2xl">Create new project</h1>
				{#if !data.githubToken}
					<form
						action="/login/github"
						method="post"
						use:enhance={async ({ formData }) => {
							const data = await onSigninGithub();
							formData.set('token', data.token);
							formData.set('redirect_url', '/main/create-project');

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
					<Button class=" w-fit " on:click={() => (isOpen = true)} color="alternative">
						<p class=" text-foreground-800 font-medium">Import repositories</p>
					</Button>
				{/if}
			</div>
			<div class=" flex-1 flex flex-col gap-10">
				<div class=" flex-1 flex flex-col gap-12">
					<Input
						class=" flex-1"
						inputClass=" text-2xl md:text-3xl lg:text-4xl font-bold"
						title="Display name"
						bind:value={projectFormStore.data.name}
						name="projectDisplayName"
						bind:error={errors[0]}
						placeholder="Display name of the project"
						required
					/>
					<Input
						title="Description"
						bind:value={projectFormStore.data.description}
						placeholder="Describe your project"
						name="projectDescription"
					/>
					<Input
						title="Home page"
						inputClass=" italic !text-blue-500"
						bind:value={projectFormStore.data.demoUrl}
						placeholder="Your project homepage"
						name="projectHomePage"
					/>
					<TechnologyInput bind:technologies={projectFormStore.data.skills} />
					<div class=" relative flex flex-col md:flex-row gap-8">
						<Input
							class=" w-36"
							title="Members"
							type="number"
							bind:value={projectFormStore.data.memberNum}
							placeholder="Your project homepage"
							name="projectMemberNum"
						/>
						<Input
							class=" flex-1"
							title="Start date"
							name="startDate"
							type="date"
							bind:value={projectFormStore.data.startDate}
						/>
						<Input
							class=" flex-1"
							title="End date"
							name="endDate"
							type="date"
							validate={(value: Date) =>
								new Date(value).getTime() >
									new Date(projectFormStore.data.startDate || new Date()).getTime() ||
								!value ||
								!projectFormStore.data.startDate
									? ''
									: 'End date must be greater than start date'}
							bind:value={projectFormStore.data.endDate}
						/>
					</div>
					<FileListUpload {files} />
					<FeatureListInput bind:features={projectFormStore.data.features} />
				</div>
			</div>
		</div>
		<div class=" flex-1 flex flex-col gap-10">
			{#if importedRepositories.length}
				<div
					class=" grid gap-8"
					in:scale={{ duration: 300, opacity: 0, start: 0 }}
					out:scale={{ duration: 300, opacity: 0.2, start: 0.2 }}
				>
					{#each importedRepositories as repo, i (repo.id)}
						<div
							animate:flip={{ duration: 300 }}
							in:scale={{ duration: 300, opacity: 0, start: 0 }}
							out:scale={{ duration: 300, opacity: 0.2, start: 0.2 }}
						>
							<ProjectRepo
								bind:repo={importedRepositories[i]}
								onRemove={(repo) => {
									importedRepositories = importedRepositories.filter((v) => v.id !== repo.id);
								}}
							/>
						</div>
					{/each}
				</div>
			{:else}
				<div
					in:scale={{ duration: 300, opacity: 0, start: 0, delay: 300 }}
					out:scale={{ duration: 300, opacity: 0, start: 0 }}
					class=" flex flex-col items-center gap-4 text-foreground-600"
				>
					<RepositoryIcon />
					<p class=" mt-4 text-center text-xl text-foreground-600 font-medium">
						There is no repository selected
					</p>
					{#if data.githubUser}
						<Button class=" w-fit " on:click={() => (isOpen = true)} color="dark">
							<p class=" text-foreground-100 dark:text-foreground-700 font-medium">
								Import repositories from Github now
							</p>
						</Button>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<form
		enctype="multipart/form-data"
		action="/main/create-project/submitted"
		method="post"
		use:enhance={async ({ formData, cancel }) => {
			if (errors.some((e) => e.message)) cancel();
			else {
				formData.set('data', JSON.stringify(projectFormStore.data));
				files.forEach((file) => {
					formData.append(`images[]`, file);
				});
			}

			return async ({ update }) => {
				await update();
			};
		}}
	>
		<FormNextButton title="Submit" {errors} />
	</form>
</div>

<GithubRepoSelectModal
	githubToken={data.githubToken}
	githubUser={data.githubUser}
	{repositories}
	bind:importedRepositories
	bind:isOpen
/>
