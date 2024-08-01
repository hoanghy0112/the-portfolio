<script lang="ts">
	import FormNextButton from '$lib/components/FormNextButton.svelte';
	import Input from '$lib/components/Input.svelte';
	import { errorStateGenerator } from '$lib/stores/error-state-generator.svelte';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte';
	import { EMAIL_REGEX } from '$lib/utils/regex';

	let errors = $derived(errorStateGenerator(4));
</script>

<div class=" grid gap-8">
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
			title="Title"
			bind:value={portfolioFormStore.data.user.title}
			name="title"
			bind:error={errors[1]}
		/>
	</div>
	<Input
		required
		validate={(value) => {
			if (!EMAIL_REGEX.test(value)) return 'You must provide a valid email';
		}}
		title="Email"
		bind:value={portfolioFormStore.data.user.email}
		bind:error={errors[2]}
		name="email"
	/>
	<Input
		title="Description"
		bind:value={portfolioFormStore.data.user.description}
		bind:error={errors[3]}
		name="description"
	/>
	<Input title="Phone number" bind:value={portfolioFormStore.data.user.phone} name="phone" />
	<Input title="Github url" bind:value={portfolioFormStore.data.user.githubUrl} name="github-url" />
	<Input
		title="LinkedIn url"
		bind:value={portfolioFormStore.data.user.linkedInUrl}
		name="linkedin-url"
	/>
	<Input
		title="Youtube url"
		bind:value={portfolioFormStore.data.user.youtubeUrl}
		name="youtube-url"
	/>
</div>

<FormNextButton {errors} destinationUrl="/main/create-portfolio/stage-2" />
