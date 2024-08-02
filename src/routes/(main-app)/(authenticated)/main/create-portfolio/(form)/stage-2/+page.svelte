<script lang="ts">
	import { enhance } from '$app/forms';
	import FormBackButton from '$lib/components/FormBackButton.svelte';
	import FormNextButton from '$lib/components/FormNextButton.svelte';
	import PortfolioProjectItem from '$lib/components/PortfolioProjectItem.svelte';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte';
	import { Button } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { twMerge } from 'tailwind-merge';

	const { data } = $props();
</script>

<div class="flex flex-col gap-10">
	<div class=" flex flex-col gap-4">
		{#if data.projects.length}
			<p class=" text-foreground-600">Click the project to choose it</p>
		{:else}
			<p class=" text-foreground-600 px-4 py-2 rounded-lg bg-foreground-100">
				You have not uploaded any projects yet
			</p>
		{/if}
		{#each data.projects as project (project.id)}
			<button
				animate:flip={{duration: 300}}
				class={twMerge(
					' item duration-300 cursor-pointer border-[3px] border-transparent bg-foreground-100 hover:bg-foreground-200 rounded-xl',
					portfolioFormStore.data.projectIds.includes(project.id) ? ' border-sky-500' : ''
				)}
				onclick={() => {
					const index = portfolioFormStore.data.projectIds.indexOf(project.id);
					if (index != -1) {
						portfolioFormStore.data.projectIds.splice(index, 1);
					} else {
						portfolioFormStore.data.projectIds.push(project.id);
					}
				}}
			>
				<PortfolioProjectItem {project} />
			</button>
		{/each}
		<a href="/main/create-project?redirect-url=/main/create-portfolio/stage-2">
			<Button outline shadow class=" w-full duration-300">
				<div class=" flex gap-2 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.5rem"
						height="1.5rem"
						viewBox="0 0 512 512"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="39.2"
							d="M256 112v288m144-144H112"
						/>
					</svg>
					<p class=" font-semibold">Add new project</p>
				</div>
			</Button>
		</a>
	</div>

	<div class=" flex justify-between">
		<FormBackButton destinationUrl="/main/create-portfolio?prev=true" />
		<form
			action="/main/create-portfolio/submitted"
			method="post"
			use:enhance={async ({ formData, cancel }) => {
				formData.set('data', JSON.stringify(portfolioFormStore.data));

				return async ({ update }) => {
					await update();
				};
			}}
		>
			<FormNextButton title="Submit"/>
		</form>
	</div>
</div>

<style>
	.item:hover {
		transform: perspective(900px) translate3d(0px, -5px, -50px) rotate3d(1, 0, 0, 15deg);
	}
</style>
