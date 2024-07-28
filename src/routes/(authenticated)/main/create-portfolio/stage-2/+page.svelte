<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import { GradientButton } from 'flowbite-svelte';

	const { data } = $props();

	const user = data.user;
</script>

<Input class=" mt-5" title="Display name" name="displayName" value="" />

<div>
	<GradientButton color="cyanToBlue" onclick={() => goto('/main/create-portfolio?prev=true')}>
		Back
	</GradientButton>
</div>
