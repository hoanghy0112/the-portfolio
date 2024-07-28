<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import type { ComponentProps } from 'svelte';

	let {
		value = $bindable(),
		required,
		class: className,
		title,
		name,
		...props
	}: {
		value: any;
		class?: string;
		title: string;
		name: string;
	} & ComponentProps<Input> = $props();
</script>

<div class={className ?? ''}>
	<Label for={name} class="block mb-0"
		>{title} <span>({required ? 'Required' : 'Optional'})</span></Label
	>
	<Input
		id={name}
		{name}
		style="box-shadow: none; -webkit-text-fill-color: var(--foreground-900); -webkit-box-shadow: 0 0 0px 1000px var(--background-color) inset;"
		class=" w-full p-0 pt-2 pb-2 rounded-none !bg-background-default border-0 border-b-2 focus:border-primary-600 text-lg font-medium px-0"
		type="text"
		bind:value
		{...props}
	/>
</div>
