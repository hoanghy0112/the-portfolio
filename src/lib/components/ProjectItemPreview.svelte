<script lang="ts">
	import { getTechnologyInfo } from '$lib/utils/technologies';
	import type { Project } from '@prisma/client';
	import { Carousel } from 'flowbite-svelte';

	type Props = {
		project: Project;
	};

	const { project }: Props = $props();
</script>

<div
	class=" w-72 md:w-96 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-foreground-100 shadow-lg dark:border-[0.5px] dark:border-foreground-400"
>
	<div class=" w-full h-48 bg-foreground-200">
		{#if project.photos.length}
			<!-- <img class=" object-cover " src={project.photos.at(0)} alt=" Project item preview" /> -->
			<Carousel
				imgClass=" w-full h-48"
				images={project.photos.map((v) => ({
					class: ' h-48 object-cover',
					src: v,
					alt: 'Preview'
				}))}
				duration={Math.floor(Math.random() * 500 + 2000)}
			/>
		{/if}
	</div>
	<div class=" grid gap-2 px-4 py-6">
		<p class=" text-foreground-900 text-lg font-semibold">{project.name}</p>
		<p class=" text-foreground-600">{project.description}</p>
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
	</div>
</div>
