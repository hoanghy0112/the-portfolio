<script>
	const { children } = $props();
</script>

<div class=" w-screen px-4 lg:px-16 pt-8 flex-1 flex flex-col gap-10">
	{@render children()}
</div>
