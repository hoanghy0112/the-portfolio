<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Label } from 'flowbite-svelte';
	import { flip } from 'svelte/animate';
	import { scale, slide } from 'svelte/transition';

	type Props = {
		title?: string;
		files?: File[];
	};

	let { title = 'Images', files = $bindable([]) }: Props = $props();

	let inputElement = $state<HTMLInputElement>();
</script>

<div class=" flex flex-col">
	<Label class="block mb-0">
		{title}
	</Label>
	<div class=" mt-4 pb-3 overflow-x-auto">
		<div class=" flex flex-row flex-initial gap-5">
			<button
				class=" group grid place-items-center flex-none w-36 h-36 rounded-lg bg-foreground-200 hover:bg-foreground-300 duration-200 cursor-pointer"
				onclick={() => {
					inputElement?.click();
				}}
				><Icon
					icon="ion:image-outline"
					class="text-4xl text-foreground-800 group-hover:scale-90 group-active:scale-75 duration-200"
				/></button
			>
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
