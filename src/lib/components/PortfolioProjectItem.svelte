<script lang="ts">
	import { getTechnologyInfo } from '$lib/utils/technologies';
	import Icon from '@iconify/svelte';
	import type { Project } from '@prisma/client';
	import { scale } from 'svelte/transition';

	type Props = {
		project: Project;
	};

	const { project }: Props = $props();
</script>

<div transition:scale={{ duration: 300 }} class=" p-4 rounded-xl duration-200">
	<div class=" flex flex-col gap-1">
		<a target="_blank" href="/main/project/{project.id}" class=" w-fit flex gap-2">
			<p class="font-semibold text-lg text-foreground-900">{project.name}</p>
			<Icon icon="ion:arrow-up-right-box-outline" class=" text-sm" />
		</a>
		<p class=" text-start text-foreground-600 text-wrap">{project.description}</p>
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
