<script lang="ts">
	import type { Repo } from '$lib/types/repo';
	import { timeDiffString } from '$lib/utils/time-manipulation';
	import { Button } from 'flowbite-svelte';

	type Props = {
		repo: Repo;
		onImport?: (repo: Repo) => any;
	};

	const { repo, onImport = () => {} }: Props = $props();

	function languageConvert(language: string) {
		const lowerCasedLanguage = language.toLowerCase();

		if (lowerCasedLanguage === 'c++') return 'cplusplus';
		else return lowerCasedLanguage;
	}
</script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />

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
	<Button
		onclick={() => onImport(repo)}
		size="sm"
		class=" !bg-white hover:!bg-slate-300 duration-200"
	>
		<p class=" text-slate-900 font-medium">Import</p>
	</Button>
</div>
