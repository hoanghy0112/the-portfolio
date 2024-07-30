<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { draw, fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import { getTechnologyInfo } from '$lib/utils/technologies.js';

	const { data } = $props();

	const project = data.project;

	let ready = $state(false);
	onMount(() => (ready = true));
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

{#key ready}
	<div
		in:fly={{ duration: 700, delay: 400, y: -50 }}
		class=" relative flex-1 flex flex-col justify-center items-center gap-10"
	>
		<div class=" py-10 lg:mr-36 relative flex-1 flex flex-col justify-center items-center gap-10">
			<div class=" z-10">
				<svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 512 512"
					><path
						in:draw={{ duration: 1500 }}
						fill="none"
						stroke="currentColor"
						stroke-miterlimit="10"
						stroke-width="22"
						d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
					/><path
						in:draw={{ duration: 1500 }}
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="22"
						d="M352 176L217.6 336L160 272"
					/></svg
				>
			</div>
			<h1
				in:fly={{ duration: 700, delay: 400, y: -50 }}
				class=" z-10 text-center text-4xl font-bold"
			>
				Create portfolio project successfully
			</h1>
			<div class=" z-10 flex flex-col items-center gap-8">
				<h2 in:fly={{ duration: 700, delay: 700, y: -50 }} class=" text-center text-lg font-medium">
					Now you can create your portfolio with your newly created project
				</h2>
				<div
					in:fly={{ duration: 700, delay: 1000, y: -50 }}
					class=" flex flex-col md:flex-row gap-4 md:gap-8"
				>
					<a href="/main/create-project?prev=true">
						<Button color="light">
							<div class=" flex gap-2 items-center">
								<Icon class=" text-foreground-800 text-lg" icon="ion:git-branch-outline" />
								<p class=" font-medium">Add another project</p>
							</div>
						</Button>
					</a>
					<a href="/main/create-portfolio">
						<Button color="light">
							<div class=" flex gap-2 items-center">
								<Icon class=" text-foreground-800 text-lg" icon="ion:newspaper-outline" />
								<p class=" font-medium">Create your portfolio</p>
							</div>
						</Button>
					</a>
				</div>
			</div>
			<div class=" z-0 absolute w-36 h-36 bg-primary-600 blur-[6rem]"></div>
		</div>
		<div
			in:fly={{ duration: 700, delay: 700, y: -50 }}
			class=" mb-20 w-full xl:w-fit max-w-[450px] xl:absolute -right-24 top-10 p-6 bg-white shadow-lg paper"
		>
			<p class=" font-semibold text-xl text-slate-900">{project.name}</p>
			<p class=" text-sm text-slate-600">{project.description}</p>
			<div class=" mt-2 flex flex-wrap gap-2">
				{#each project.skills as skill (skill)}
					<div
						class=" flex items-center gap-1 w-fit px-2 py-1 rounded-md"
						style="background-color: {getTechnologyInfo(skill)?.color};"
					>
						<i class=" devicon-{skill}-plain text-xs"></i>
						<p class=" text-xs text-white font-semibold">{skill}</p>
					</div>
				{/each}
			</div>
			<p class=" mt-4 font-semibold text-sm text-slate-900">Github repos</p>
			<div class=" mt-2 flex flex-col gap-2">
				{#each project.repoUrls as repo (repo.url)}
					<a
						href={repo.url}
						target="_blank"
						class=" text-sm flex items-center text-foreground-900 w-fit px-2 py-1 rounded-md bg-foreground-200 hover:bg-foreground-300 gap-2 duration-200 cursor-pointer"
					>
						<Icon icon="ion:logo-github" class=" text-base" />
						<p class=" text-xs text-white font-medium">{repo.name}</p>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/key}

<style>
	@media (min-width: 1024px) {
		.paper {
			transform: rotate3d(6, -3, 3, 50deg);
		}
	}
</style>
