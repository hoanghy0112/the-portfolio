<script lang="ts">
	import Icon from '@iconify/svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		title: string;
		number: number | string;
		unit: string;
		icon?: string;
		backgroundClass?: string;
		primaryClass?: string;
	};

	const { title, number, unit, icon = '', backgroundClass, primaryClass }: Props = $props();
</script>

<div
	class={twMerge(
		'min-w-[250px] flex gap-4 items-center px-4 py-3 border-[1px] border-foreground-300 shadow-lg rounded-lg shadow-foreground-300 dark:shadow-none dark:border-[1px] dark:border-foreground-300'
	)}
>
	<div class={twMerge(' p-3 bg-red-100 rounded-full', backgroundClass)}>
		<Icon stroke-width="3" {icon} class={twMerge(' text-2xl text-red-500 ', primaryClass)} />
	</div>
	<div class=" flex flex-col justify-start gap-0">
		<div class=" flex gap-1 items-end">
			<p class=" pl-1 text-2xl text-foreground-900 font-semibold">{number}</p>
			<p class=" text-foreground-600">{unit}</p>
		</div>
		<p class=" text-foreground-600 font-light">{title}</p>
	</div>
</div>
