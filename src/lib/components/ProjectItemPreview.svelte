<script lang="ts">
	import { getTechnologyInfo } from '$lib/utils/technologies';
	import type { Project } from '@prisma/client';

	type Props = {
		project: Project;
	};

	const { project }: Props = $props();
</script>

<div class=" w-96 rounded-xl overflow-hidden flex flex-col gap-4 bg-foreground-100 shadow-2xl dark:border-[0.5px] dark:border-foreground-400">
	<div class=" h-48 flex bg-foreground-200">
		{#if project.photos.length}
			<img class=" object-cover " src={project.photos.at(0)} alt=" Project item preview" />
		{/if}
	</div>
	<div class=" grid gap-2 p-3">
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
