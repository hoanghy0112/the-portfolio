<script lang="ts">
	import { getTechnologyInfo } from '$lib/utils/technologies';
	import type { Project } from '@prisma/client';
	import { Button, Carousel } from 'flowbite-svelte';

	type Props = {
		project: Project;
	};

	const { project }: Props = $props();
</script>

<div class="group flex">
	<div
		class=" main relative w-72 md:w-96 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-foreground-100 shadow-lg dark:border-[0.5px] dark:border-foreground-400 duration-[600ms]"
	>
		<div class=" w-full h-48 bg-foreground-200 group-hover:invisible delay-300">
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
		<div class=" h-full bg-white dark:bg-foreground-100 flex flex-col gap-2 px-4 py-6">
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
		<div
			class=" back px-20 flex flex-col justify-center items-stretch gap-4 opacity-0 delay-[200ms] scale-105 z-20 rounded-xl group-hover:opacity-100 absolute w-full h-full top-0 left-0 bg-background-default"
		>
			<Button color="light">Create portfolio</Button>
			<Button color="light">Edit</Button>
			<Button outline color="red">Delete</Button>
		</div>
	</div>
</div>

<style>
	div:hover .main {
		/* transform: perspective(900px) translate3d(0px, -10px, -80px) rotate3d(1, 0, 0, 20deg); */
		transform: perspective(900px) translate3d(0px, -0px, -100px) rotate3d(0, 1, 0, 180deg);
	}

	div:hover .back {
		/* transform: perspective(900px) translate3d(0px, -10px, -80px) rotate3d(1, 0, 0, 20deg); */
		transform: perspective(900px) rotate3d(0, 1, 0, 180deg);
	}
</style>
