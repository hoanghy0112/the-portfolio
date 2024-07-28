<script>
	import { goto } from '$app/navigation';
	import SectionList from '$lib/components/SectionList.svelte';
	import { Button, GradientButton } from 'flowbite-svelte';
</script>

<div>
	<SectionList title="Your Porfolio">
		<GradientButton onclick={() => goto('/main/create-portfolio')} color="tealToLime">
			Create one
		</GradientButton>
	</SectionList>
</div>
