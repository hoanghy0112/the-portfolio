<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte';
	import { GradientButton } from 'flowbite-svelte';
</script>

<div class=" lg:w-1/2 grid gap-8">
	<div class=" flex gap-8">
		<Input
			class=" flex-1"
			title="Display name"
			bind:value={portfolioFormStore.data.userName}
			name="displayName"
		/>
		<Input class="" title="Title" bind:value={portfolioFormStore.data.title} name="title" />
	</div>
	<Input required class="" title="Email" bind:value={portfolioFormStore.data.email} name="email" />
</div>

<div>
	<GradientButton color="cyanToBlue" onclick={() => goto('/main/create-portfolio/stage-2')}>
		Next step
	</GradientButton>
</div>
