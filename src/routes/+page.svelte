<script>
	import SectionList from '$lib/components/SectionList.svelte';
	import { Button, GradientButton } from 'flowbite-svelte';
</script>

<div>
	<SectionList title="Your Porfolio">
		<a href="/main/create-portfolio">
			<GradientButton color="tealToLime">Create one</GradientButton></a
		>
	</SectionList>
</div>
