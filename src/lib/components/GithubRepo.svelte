<script lang="ts">
	import type { IProjectRepo } from '$lib/types/repo';
	import { languageConvert } from '$lib/utils/languageConvert';
	import { timeDiffString } from '$lib/utils/time-manipulation';
	import { Button } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	type Props = {
		repo: IProjectRepo;
	};

	const { repo = $bindable() }: Props = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

<div
	class=" px-4 py-3 flex justify-between items-center rounded-none border-b-[1px] border-foreground-300 duration-200"
>
	<div class="flex gap-1">
		<div class=" w-5">
			{#if repo.language}
				<i class=" mt-1 devicon-{languageConvert(repo.language)}-plain colored"></i>
			{/if}
		</div>
		<div class=" grid gap-1">
			<a
				target="_blank"
				href={repo.html_url}
				class=" cursor-pointer font-medium text-foreground-800">{repo.name}</a
			>
			<p class=" text-foreground-500">
				{timeDiffString(new Date(repo.pushed_at))}
			</p>
		</div>
	</div>
	<div>
		<Button
			onclick={() => (repo.isImported = !repo.isImported)}
			size="sm"
			color="none"
			shadow
			class=" w-20 duration-200 active:scale-50 {repo.isImported
				? ' !bg-red-600 hover:!bg-red-700'
				: '!bg-white hover:!bg-slate-300'}"
		>
			<p class=" {repo.isImported ? 'text-slate-50' : 'text-slate-900'} font-medium">
				{repo.isImported ? 'Remove' : 'Import'}
			</p>
		</Button>
	</div>
</div>
