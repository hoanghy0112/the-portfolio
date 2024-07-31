<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	let {
		value = $bindable(),
		error = $bindable({ message: '' }),
		validate = () => null,
		type = 'text',
		required,
		class: className,
		inputClass = '',
		title,
		name,
		placeholder,
		...props
	}: {
		value?: any;
		class?: string;
		title: string;
		name: string;
		inputClass?: string;
		error?: { message: string | null; element?: HTMLInputElement };
		validate?: (value: any) => string | null | undefined;
	} & HTMLInputAttributes = $props();

	let element = $state<HTMLInputElement>();
	let isDisplayError = $state(false);

	function validateValue(value: any): string | null {
		if (required && !value) return `${title} is required`;
		return validate(value) || null;
	}

	$effect(() => {
		error.message = validateValue(value);
	});

	$effect(() => {
		if (error?.message) {
			error.element = element;
		}
	});
</script>

<div class={className ?? ''}>
	<Label for={name} class="block mb-0">
		<p class=" text-foreground-500">
			{title} <span>({required ? 'Required' : 'Optional'})</span>
		</p>
	</Label>
	<input
		id={name}
		{name}
		{...props}
		{type}
		style={`box-shadow: none; ${error?.message && isDisplayError ? '' : '-webkit-box-shadow: 0 0 0px 1000px transparent inset;'}'`}
		class={twMerge(
			' input mt-3 w-full p-0 pt-0 pb-1 bg-transparent rounded-none border-0 border-b-2 border-foreground-400 focus:border-sky-600 focus:border-b-3 text-lg font-medium px-0',
			value ? ' text-foreground-900' : ' text-foreground-400',
			inputClass,
			error?.message && isDisplayError ? ' !bg-red-400' : ' bg-transparent'
		)}
		placeholder={error?.message && isDisplayError ? '' : placeholder}
		bind:value
		bind:this={element}
		onblur={() => {
			isDisplayError = true;
		}}
	/>
	{#if isDisplayError}
		<p in:fly={{ y: -100 }} class=" mt-2 text-red-500 font-medium">{error.message}</p>
	{/if}
</div>

<style>
	.input::placeholder {
		-webkit-text-fill-color: var(--foreground-400) !important;
	}

	::-webkit-calendar-picker-indicator {
		background-color: #ffffff;
		padding: 5px;
		cursor: pointer;
		border-radius: 4px;
		transition-duration: 200ms;
	}

	::-webkit-calendar-picker-indicator:hover {
		background-color: #c9c9c9;
		padding: 5px;
		cursor: pointer;
		border-radius: 4px;
	}
</style>
