<script lang="ts">
	import type { Project } from '@prisma/client';

	const {
		form
	}: {
		form: { project?: Project; error?: string };
	} = $props();
</script>

{#if form.project}
	<h1 class=" font-semibold">Delete project successfully</h1>
{:else}
	<h1 class=" font-semibold">Fail to delete project</h1>
{/if}
