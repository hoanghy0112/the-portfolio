<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, GradientButton, Label } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';

	type Props = {
		title?: string;
		description?: string;
		files?: File[];
		fileUrls?: string[];
	};

	let {
		title = 'Images',
		description,
		files = $bindable([]),
		fileUrls = $bindable([])
	}: Props = $props();

	let inputElement = $state<HTMLInputElement>();
</script>

<div class=" flex flex-col">
	<div class=" flex items-center justify-between">
		<div class=" grid gap-1">
			<p class=" font-semibold text-foreground-700">
				{title}
			</p>
			{#if description}
				<p class=" text-sm text-foreground-500">{description}</p>
			{/if}
		</div>
		<Button
			onclick={() => {
				inputElement?.click();
			}}
			class=" w-fit "
			color="dark"
		>
			<div class=" flex gap-1 items-center">
				<Icon icon="fluent:image-24-filled" class=" text-xl" />
				<p class=" text-foreground-100 dark:text-foreground-700 font-medium">Upload images</p>
			</div>
		</Button>
	</div>
	<div
		class=" mt-5 pb-3 {files.length || fileUrls.length ? ' overflow-x-auto' : 'overflow-x-visible'}"
	>
		{#if files.length || fileUrls.length}
			<div class=" flex flex-row flex-initial gap-5">
				{#each fileUrls as fileUrl (fileUrl)}
					<div
						in:scale={{ duration: 300 }}
						out:slide={{ duration: 300, axis: 'x' }}
						animate:flip={{ duration: 300 }}
						class=" flex-none relative group"
					>
						<img class=" h-36 rounded-lg object-cover shadow-lg" src={fileUrl} alt="preview" />
						<button
							onclick={() => {
								fileUrls = fileUrls.filter((v) => v !== fileUrl);
							}}
							class=" opacity-0 group-hover:opacity-100 grid absolute top-0 w-full h-full place-items-center cursor-pointer bg-[#26262676] duration-200"
						>
							<Icon
								icon="ion:close-outline"
								class=" text-5xl text-slate-50 scale-75 group-hover:scale-100 group-active:scale-50 duration-200"
							/>
						</button>
					</div>
				{/each}
				{#each files as file (file.name)}
					<div
						in:scale={{ duration: 300 }}
						out:slide={{ duration: 300, axis: 'x' }}
						animate:flip={{ duration: 300 }}
						class=" flex-none relative group"
					>
						<img
							class=" h-36 rounded-lg object-cover shadow-lg"
							src={URL.createObjectURL(file)}
							alt="preview"
						/>
						<button
							onclick={() => {
								files = files.filter((v) => v !== file);
							}}
							class=" opacity-0 group-hover:opacity-100 grid absolute top-0 w-full h-full place-items-center cursor-pointer bg-[#26262676] duration-200"
						>
							<Icon
								icon="ion:close-outline"
								class=" text-5xl text-slate-50 scale-75 group-hover:scale-100 group-active:scale-50 duration-200"
							/>
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<div class=" bg-foreground-100 -mx-4 px-4 py-4 rounded-lg">
				<p class=" text-foreground-500">You have not upload any images yet</p>
			</div>
		{/if}
	</div>
	<input
		onchange={(e) => {
			//@ts-ignore
			const inputFiles = e.target?.files as FileList;
			for (let i = 0; i < inputFiles.length; i++) {
				const file = inputFiles.item(i);
				if (file) files.push(file);
			}
		}}
		bind:this={inputElement}
		type="file"
		multiple
		class=" hidden"
	/>
</div>
