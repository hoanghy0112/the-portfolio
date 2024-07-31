<script>
	const { children } = $props();
</script>

<div class=" w-screen px-4 py-6 lg:px-10 pt-8 flex-1 flex flex-col gap-10">
	{@render children()}
</div>
