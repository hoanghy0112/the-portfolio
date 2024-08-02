<script lang="ts">
	import type { Feature } from '@prisma/client';
	import { flip } from 'svelte/animate';
	import FeatureItem from './FeatureItem.svelte';
	import FeatureItemInput from './FeatureItemInput.svelte';

	type Props = {
		features?: Feature[];
	};

	const { features = $bindable([]) }: Props = $props();

	let isUploading = $state(false);
</script>

<div class=" flex flex-col">
	<div class=" flex items-center justify-between">
		<div class=" grid gap-1">
			<p class=" font-semibold">Features</p>
			<p></p>
		</div>
	</div>
	<div
		class=" mt-5 pb-3 flex flex-col gap-4 {features.length
			? ' overflow-x-auto'
			: 'overflow-x-visible'}"
	>
		{#if features.length}
			<div class=" flex flex-col flex-initial gap-5">
				{#each features as feature, i (i)}
					<div animate:flip={{ duration: 300 }}>
						<FeatureItem
							bind:isUploading
							bind:feature={features[i]}
							onRemove={() => {
								features.splice(i, 1);
							}}
						/>
					</div>
				{/each}
			</div>
		{:else}
			<div class=" bg-foreground-100 px-4 py-4 rounded-lg">
				<p class=" text-foreground-500">You have not describe any features yet</p>
			</div>
		{/if}
		<FeatureItemInput
			bind:isUploading
			onSubmit={(feature) => {
				features.push({ ...feature, order: features.length } as Feature);
			}}
		/>
	</div>
</div>
