<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte';
	import { GradientButton } from 'flowbite-svelte';
	import { errorStateGenerator } from '$lib/stores/error-state-generator.svelte';

	let errors = $derived(errorStateGenerator(3));
</script>

<div class=" lg:w-1/2 grid gap-8">
	<div class=" flex flex-col xl:flex-row gap-8">
		<Input
			class=" flex-1"
			title="Display name"
			bind:value={portfolioFormStore.data.user.name}
			name="displayName"
			bind:error={errors[0]}
			required
		/>
		<Input
			class=""
			title="Title"
			bind:value={portfolioFormStore.data.user.title}
			name="title"
			bind:error={errors[1]}
		/>
	</div>
	<Input
		required
		class=""
		title="Email"
		bind:value={portfolioFormStore.data.user.email}
		bind:error={errors[2]}
		name="email"
	/>
</div>

<div>
	<GradientButton
		color="cyanToBlue"
		onclick={() => {
			if (errors.every((e) => !e.message)) goto('/main/create-portfolio/stage-2');
			else {
				const element = errors.find((e) => e.message)?.element;
				console.log({ element });
				if (element) element.focus();
			}
		}}
	>
		Next step
	</GradientButton>
</div>
