<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	let {
		value = $bindable(),
		error = $bindable(),
		validate = () => null,
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
		error?: { message: string | null; element?: HTMLInputElement };
		validate?: (value: any) => string | null;
	} & HTMLInputAttributes = $props();

	let element = $state<HTMLInputElement>();

	function validateValue(value: any): string | null {
		if (required && !value) return `${title} is required`;
		return validate(value);
	}

	$effect(() => {
		if (error?.message) {
			error.message = validateValue(value);
		}
		if (error && required) {
			error.message = validateValue(value);
		}
	});

	$effect(() => {
		if (error?.message) {
			error.element = element;
		}
	});
</script>

<div class={className ?? ''}>
	<Label for={name} class="block mb-0">
		{title} <span>({required ? 'Required' : 'Optional'})</span>
	</Label>
	<input
		id={name}
		{name}
		{...props}
		style={`box-shadow: none; ${error?.message ? '' : '-webkit-text-fill-color: var(--foreground-900); -webkit-box-shadow: 0 0 0px 1000px var(--background-color) inset;'}'`}
		class={twMerge(
			' mt-1 w-full p-0 pt-2 pb-2 rounded-none border-0 border-b-2 focus:border-primary-600 text-lg font-medium px-0',
			error?.message ? ' !bg-red-400' : ' bg-background-default'
		)}
		type="text"
		bind:value
		bind:this={element}
		onblur={() => {
			if (error) error.message = validateValue(value);
		}}
	/>
	{#if error?.message}
		<p class=" mt-2 text-red-500 font-medium">{error.message}</p>
	{/if}
</div>
