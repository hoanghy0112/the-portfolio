<script lang="ts">
	import type { Feature } from '@prisma/client';
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';
	import FeatureItemInput from './FeatureItemInput.svelte';
	import Icon from '@iconify/svelte';
	import { Button } from 'flowbite-svelte';
	import FeatureItem from './FeatureItem.svelte';

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
	<div class=" mt-5 pb-3 {features.length ? ' overflow-x-auto' : 'overflow-x-visible'}">
		<FeatureItemInput
			bind:isUploading
			onSubmit={(feature) => {
				features.push(feature);
			}}
		/>
		{#if features.length}
			<div class=" flex flex-col flex-initial gap-5">
				{#each features as feature, i (feature.title)}
					<div animate:flip={{ duration: 300 }}>
						<FeatureItem bind:isUploading bind:feature={features[i]} />
					</div>
				{/each}
			</div>
		{:else}
			<div class=" bg-foreground-100 px-4 py-4 rounded-lg">
				<p class=" text-foreground-500">You have not describe any features yet</p>
			</div>
		{/if}
	</div>
</div>
