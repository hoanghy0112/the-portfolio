<script lang="ts">
	const { children } = $props();
</script>

<div class="w-full flex-1 flex flex-col lg:flex-row gap-8">
	<div class=" flex-1 flex flex-col gap-12">
		<h1 class=" w-fit font-semibold text-2xl">Create new project</h1>
		<div class=" flex-1 overflow-auto grid gap-10">
			{@render children()}
		</div>
	</div>
</div>
