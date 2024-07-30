<script lang="ts">
	import { TECHNOLOGIES } from '$lib/constants/technologies';
	import Icon from '@iconify/svelte';

	type Props = {
		name: string;
		onRemove?: (name: string) => any;
	};

	const { name, onRemove = () => {} }: Props = $props();

	const info = TECHNOLOGIES.find((value) => value.name === name);
</script>

{#if info}
	<div
		style="border-color: {info.color}; box-shadow: 0 0 18px -5px {info.color}"
		class=" px-2 py-1 text-sm flex gap-2 items-center bg-foreground-100 border-[1px] rounded-md"
	>
		<i class=" devicon-{name}-plain colored"></i>
		<p style="color: {info.color};" class=" font-medium">{info.name}</p>
		<button
			onclick={() => {
				onRemove(name);
			}}
			class=" ml-2 p-1 cursor-pointer rounded-full bg-foreground-100 hover:bg-foreground-200"
		>
			<Icon icon="ion:close-outline" class="" />
		</button>
	</div>
{/if}
