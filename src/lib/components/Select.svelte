<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Search } from 'flowbite-svelte';

	type Props = {
		title?: string;
		selected?: string | null;
		onSelect?: (value: { id: string; title: string }) => any;
		items?: { id: string; title: string }[];
	};

	let {
		title = 'Select theme',
		selected = $bindable('default'),
		onSelect = () => {},
		items = []
	}: Props = $props();

	let isOpen = $state(false);
	let search = $state('');
</script>

<div>
	<Button color="alternative">
		<div class=" flex gap-2">
			<p class=" text-foreground-700 font-medium">
				{selected ? items.find((v) => v.id === selected)?.title || selected : title}
			</p>
			<Icon icon="ion:chevron-down-outline" class="mt-[1px]" font-size={18} />
		</div>
	</Button>
	<Dropdown
		placement="bottom-start"
		bind:open={isOpen}
		class=" overflow-y-auto px-3 pb-3 text-sm h-44"
	>
		<div slot="header" class="p-3">
			<Search bind:value={search} size="md" />
		</div>
		<div class=" grid">
			{#each items.filter((item) => item.title.match(new RegExp(search, 'ig'))) as item (item.id)}
				<button
					class="w-full font-medium text-start rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-600 duration-200"
					onclick={() => {
						onSelect(item);
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
