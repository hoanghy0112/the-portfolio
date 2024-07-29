<script>
	import { goto } from '$app/navigation';
	import SectionList from '$lib/components/SectionList.svelte';
	import { Button, GradientButton } from 'flowbite-svelte';
</script>

<div class=" px-4 lg:px-16 pt-8 flex-1 grid gap-16">
	<SectionList
		title="Your Projects"
		description="All your projects which you have added to your portfolio"
	>
		<GradientButton onclick={() => goto('/main/create-project')} color="tealToLime">
			Create one
		</GradientButton>
	</SectionList>
	<SectionList title="Your Porfolio">
		<GradientButton onclick={() => goto('/main/create-portfolio')} color="tealToLime">
			Create one
		</GradientButton>
	</SectionList>
</div>
