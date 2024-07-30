<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import FormNextButton from '$lib/components/FormNextButton.svelte';
	import GithubRepo from '$lib/components/GithubRepo.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import { signInWithGithub } from '$lib/firebase/authentication';
	import { errorStateGenerator } from '$lib/stores/error-state-generator.svelte';
	import { projectFormStore } from '$lib/stores/project-form.svelte';
	import type { Repo } from '$lib/types/repo.js';
	import { Button, GradientButton, ListPlaceholder, Modal } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	const { data } = $props();
	console.log(data.repos);

	const defaultSelectedOrganization =
		$page.url.searchParams.get('organization') || data.githubUser.login;
	let selectedOrganization = $state(defaultSelectedOrganization);

	const organizations = $derived([
		{ id: data.githubUser.login, title: data.githubUser.login },
		...data.organizations.map((v) => ({ id: v.login, title: v.login }))
	]);

	let isOpen = $state(false);

	let errors = $derived(errorStateGenerator(4));

	onMount(async () => {
		projectFormStore.data.authorId = data.user.id;
	});

	async function onSigninGithub() {
		const data = await signInWithGithub();
		return data;
	}

	async function onImport(repo: Repo) {}
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
								{#each data.repos as repo (repo.id)}
									<GithubRepo {onImport} {repo} />
								{/each}
							{/if}
						</div>
					</div>
				</Modal>
			{/if}
		</div>
		<div class=" flex-1 overflow-auto grid gap-10">
			<div class=" grid gap-8">
				<div class=" flex flex-col xl:flex-row gap-8">
					<Input
						class=" flex-1"
						title="Display name"
						bind:value={projectFormStore.data.name}
						name="projectDisplayName"
						bind:error={errors[0]}
						required
					/>
				</div>
				<Input
					title="Description"
					bind:value={projectFormStore.data.description}
					bind:error={errors[3]}
					name="projectDescription"
				/>
			</div>
		</div>
	</div>
	<div class=" flex-1"></div>
</div>

<FormNextButton {errors} destinationUrl="/main/create-portfolio/stage-2" />
