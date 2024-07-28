<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, GradientButton, Search, Select } from 'flowbite-svelte';

	type Props = {
		selected?: string;
		items?: { id: string; title: string }[];
	};

	let { selected = $bindable(), items = [] }: Props = $props();

	let isOpen = $state(false);
</script>

<div>
	<GradientButton color="purpleToPink">
		<div class=" flex gap-2">
			{selected ? items.find((v) => v.id === selected)?.title : 'Select theme'}
			<Icon icon="ion:chevron-down-outline" class="mt-[1px]" font-size={18} />
		</div>
	</GradientButton>
	<Dropdown bind:open={isOpen} class="overflow-y-auto px-3 pb-3 text-sm h-44">
		<div slot="header" class="p-3">
			<Search size="md" />
		</div>
		<div>
			{#each items as item (item.id)}
				<button
					class="w-full font-medium text-start rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600 duration-200"
					onclick={() => {
						selected = item.id;
						isOpen = false;
					}}
				>
					{item.title}
				</button>
			{/each}
		</div>
	</Dropdown>
</div>
