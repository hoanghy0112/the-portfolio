<script lang="ts">
	import { searchTechnologies } from '$lib/utils/technologies';
	import { Label } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
	import TechnologyChip from './TechnologyChip.svelte';

	type Props = { technologies?: string[] };

	let { technologies = $bindable([]) }: Props = $props();

	let isOpen = $state(false);
	let keyword = $state('');
	let selectedIndex = $state(0);

	let inputElement = $state<HTMLInputElement>();
	let modalElement = $state<HTMLDivElement>();

	const technologyList = $derived(
		searchTechnologies(keyword).filter((v) => !technologies.includes(v.name))
	);

	function onKeyDown(e: KeyboardEvent) {
		const name = technologyList[selectedIndex].name;
		e.stopPropagation();
		if (e.key === 'Backspace' && keyword === '') {
			technologies.pop();
		}
		if (e.key === 'Enter' || e.key === 'Tab') {
			keyword = '';
			technologies.push(name);
			selectedIndex = 0;
		}
		if (e.key === 'ArrowDown') {
			modalElement?.scrollTo({ top: selectedIndex * 40, behavior: 'smooth' });
			selectedIndex++;
		}
		if (e.key === 'ArrowUp') {
			selectedIndex--;
			modalElement?.scrollTo({ top: selectedIndex * 40, behavior: 'smooth' });
		}
		isOpen = true;
		inputElement?.focus();
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
	/>
</svelte:head>

<svelte:window
	onclick={() => {
		isOpen = false;
	}}
/>

<div>
	<Label for="technology-selector" class="block mb-0">
		<p class=" text-foreground-500">Select your project technologies</p>
	</Label>
	<div
		class=" relative mt-3 w-full flex flex-wrap gap-y-3 p-0 pb-2 rounded-none border-0 border-b-2 border-foreground-500"
	>
		{#each technologies as technology (technology)}
			<div class=" mr-3" transition:slide={{ axis: 'x', duration: 300 }}>
				<TechnologyChip
					name={technology}
					onRemove={(name) => {
						technologies = technologies.filter((v) => v !== name);
					}}
				/>
			</div>
		{/each}
		<input
			class=" my-1 flex-1 min-w-[200px] placeholder-foreground-500 border-0 rounded-none bg-background-default outline-none"
			style={`box-shadow: none; -webkit-box-shadow: 0 0 0px 1000px var(--background-color) inset;`}
			placeholder="Search by technology name"
			bind:this={inputElement}
			bind:value={keyword}
			onclick={(e) => {
				e.stopPropagation();
				if (keyword) {
					isOpen = true;
				}
			}}
			onkeydown={onKeyDown}
		/>
		{#if isOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				bind:this={modalElement}
				onclick={(e) => {
					e.stopPropagation();
				}}
				transition:slide={{ duration: 300 }}
				class=" absolute z-20 w-full px-4 py-2 flex flex-col gap-1 -bottom-3 rounded-lg shadow-2xl translate-y-full bg-foreground-50 max-h-40 overflow-y-auto"
			>
				{#each technologyList as technology, index (technology.name)}
					<button
						onclick={() => {
							isOpen = false;
							keyword = '';
							selectedIndex = 0;
							technologies.push(technology.name);
							inputElement?.focus();
						}}
					>
						<div
							class=" h-10 px-2 py-1 flex items-center gap-2 duration-200 hover:bg-foreground-200 rounded-lg {selectedIndex ===
							index
								? 'bg-foreground-200'
								: ''}"
						>
							<i class=" devicon-{technology.name}-plain colored"></i>
							<p class=" text-foreground-800 font-medium">{technology.name}</p>
						</div>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
