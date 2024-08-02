<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		options?: {
			icon?: string;
			textClass?: string;
			title?: string;
			href?: string;
			onclick?: () => any;
		}[];
	};

	const { options = [] }: Props = $props();
</script>

<div>
	<button class=" p-2 rounded-lg hover:bg-foreground-100 dark:hover:bg-foreground-200 duration-300">
		<Icon class="text-2xl" icon="solar:reorder-outline" />
	</button>
	<Dropdown classContainer="p-0" placement="bottom-end">
		{#each options as option (option.title)}
			<div class=" w-full" transition:slide|global={{ duration: 200 }}>
				{#if option.href}
					<a
						class={twMerge(
							' flex gap-3 items-center font-medium w-full text-start px-4 py-1 hover:bg-foreground-100 duration-200',
							option.textClass
						)}
						href={option.href}
					>
						<Icon icon={option.icon || ''} class=" text-lg" />
						{option.title}
					</a>
				{:else}
					<button
						class={twMerge(
							' flex gap-3 items-center font-medium w-full text-start px-4 py-1 hover:bg-foreground-100 duration-200',
							option.textClass
						)}
						onclick={() => option.onclick?.()}
					>
						<Icon icon={option.icon || ''} class=" text-lg" />{option.title}</button
					>
				{/if}
			</div>
		{/each}
	</Dropdown>
</div>
