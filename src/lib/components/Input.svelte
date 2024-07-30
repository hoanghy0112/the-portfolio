<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	let {
		value = $bindable(),
		error = $bindable({ message: '' }),
		validate = () => null,
		required,
		class: className,
		title,
		name,
		...props
	}: {
		value?: any;
		class?: string;
		title: string;
		name: string;
		error?: { message: string | null; element?: HTMLInputElement };
		validate?: (value: string) => string | null | undefined;
	} & HTMLInputAttributes = $props();

	let element = $state<HTMLInputElement>();
	let canCheck = $state(false);

	function validateValue(value: any): string | null {
		if (required && !value) return `${title} is required`;
		return validate(value) || null;
	}

	$effect(() => {
		if (error && canCheck) {
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
			' mt-2 w-full p-0 pt-0 pb-2 rounded-none border-0 border-b-2 focus:border-sky-600 focus:border-b-3 text-lg font-medium px-0',
			error?.message ? ' !bg-red-400' : ' bg-background-default'
		)}
		type="text"
		bind:value
		bind:this={element}
		onblur={() => {
			canCheck = true;
		}}
	/>
	<div class=" em:h-4 mt-1 flex">
		{#if error?.message}
			<p in:fly={{ y: -100 }} class=" text-red-500 font-medium">{error.message}</p>
		{/if}
	</div>
</div>
