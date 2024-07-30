<script lang="ts">
	import { Datepicker, Label } from 'flowbite-svelte';

	let { title, required, name }: { title: string; required?: boolean; name: string } = $props();
</script>

<div class=" grid gap-4">
	<Label for={name} class="block mb-0">
		{title} <span>({required ? 'Required' : 'Optional'})</span></Label
	>
	<Datepicker
		id={name}
		datepickerButtons
		datepickerOrientation="top left"
		datepickerTitle={title}
		datepickerFormat="dd/mm/yyyy"
	/>
</div>
