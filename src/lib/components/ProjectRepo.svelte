<script lang="ts">
	import type { IProjectRepo } from '$lib/types/repo';
	import { languageConvert } from '$lib/utils/languageConvert';
	import { capitalizeFirstLetter } from '$lib/utils/string-manipulation';
	import Icon from '@iconify/svelte';
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Input from './Input.svelte';

	type Props = { repo: IProjectRepo };

	const { repo = $bindable() }: Props = $props();

	onMount(() => {
		repo.displayName = repo.name
			.split('-')
			.map((v) => capitalizeFirstLetter(v))
			.join(' ');
	});
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

<div
	class=" border-[0.5px] rounded-lg px-4 py-4 border-foreground-300 grid gap-6"
>
	<div class=" flex flex-col gap-4 md:flex-row md:justify-between">
		<div class=" flex flex-col md:flex-row items-center gap-4">
			<a
				href={repo.html_url}
				class=" text-sm flex items-center text-foreground-900 w-fit px-2 py-1 rounded-md bg-foreground-200 hover:bg-foreground-300 gap-2 duration-200 cursor-pointer"
			>
				<Icon icon="ion:logo-github" class=" text-lg" />
				<p class=" font-medium">{repo.full_name}</p>
			</a>
			<div
				class=" text-sm flex items-center text-foreground-900 w-fit px-2 py-1 rounded-md bg-foreground-200 hover:bg-foreground-300 gap-2 duration-200"
			>
				{#if repo.language}
					<i class=" devicon-{languageConvert(repo.language)}-plain colored"></i>
				{/if}
				<p class=" font-medium">{repo.language}</p>
			</div>
		</div>
		<div>
			<Button
				onclick={() => {
					repo.isImported = false;
				}}
				color="alternative"
				size="sm"
				class=" active:scale-75 duration-200"
			>
				<p class=" text-red-500 font-medium">Remove</p>
			</Button>
		</div>
	</div>
	<div class=" flex flex-col gap-6">
		<Input title="Name" bind:value={repo.displayName} required name="repoName" />
		<Input title="Description" bind:value={repo.description} name="repoDescription" />
	</div>
</div>
