<script lang="ts">
	import FormBackButton from '$lib/components/FormBackButton.svelte';
	import Input from '$lib/components/Input.svelte';
</script>

<Input class=" mt-5" title="Display name" name="displayName" value="" />

<FormBackButton destinationUrl="/main/create-portfolio?prev=true" />
