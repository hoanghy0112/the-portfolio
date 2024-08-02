<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		isDeleting?: boolean;
		options?: {
			icon?: string;
			textClass?: string;
			title?: string;
			href?: string;
			action?: string;
			onclick?: () => any;
		}[];
	};

	let { isDeleting = $bindable(false), options = [] }: Props = $props();
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
						href={option.href}
						class={twMerge(
							' text-foreground-900 flex gap-3 items-center font-medium w-full text-start px-4 py-1 hover:bg-foreground-100 duration-200',
							option.textClass
						)}
					>
						<Icon icon={option.icon || ''} class=" text-lg" />
						{option.title}
					</a>
				{:else if option.action}
					<form
						use:enhance={() => {
							isDeleting = true;
							return async ({ update }) => {
								await update();
							};
						}}
						class=" w-full flex flex-col"
						action={option.action}
						method="post"
					>
						<button
							class={twMerge(
								' flex gap-3 items-center font-medium w-full text-start px-4 py-1 hover:bg-foreground-100 duration-200',
								option.textClass
							)}
						>
							<Icon icon={option.icon || ''} class=" text-lg" />
							{option.title}
						</button>
					</form>
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
