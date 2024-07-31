<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Feature } from '@prisma/client';
	import { Button, Modal } from 'flowbite-svelte';
	import { scale, slide } from 'svelte/transition';
	import FileListUpload from './FileListUpload.svelte';
	import Input from './Input.svelte';
	import Icon from '@iconify/svelte';

	type Props = {
		feature: Feature;
		isUploading?: boolean;
		onRemove?: (feature: Feature) => any;
	};

	let {
		feature = $bindable(),
		isUploading = $bindable(false),
		onRemove = () => {}
	}: Props = $props();

	let isOpen = $state(false);
	let files = $state<File[]>([]);
</script>

<div>
	<div
		in:scale={{ duration: 300 }}
		out:slide={{ duration: 300, axis: 'x' }}
		class=" group flex-1 flex flex-col relative group bg-foreground-100 px-4 py-2 rounded-xl"
	>
		<p class=" text-lg font-semibold text-foreground-900">{feature.title}</p>
		{#if feature.description}
			<p class=" text-foreground-600 flex-1 truncate">{feature.description}</p>
		{/if}
		{#if feature.demoUrl}
			<a
				href={feature.demoUrl}
				target="_blank"
				class=" mt-2 text-sm flex items-center text-black w-fit px-2 py-1 rounded-md bg-slate-200 hover:bg-slate-300 gap-2 duration-200 cursor-pointer"
			>
				<Icon icon="ion:link-outline" class=" text-black text-base" />
				<p class=" text-xs text-black font-medium">{feature.demoUrl}</p>
			</a>
		{/if}
		<div class=" mt-2 hidden justify-end gap-4 group-hover:flex">
			<Button class=" duration-300" outline color="dark" onclick={() => {}}>Edit</Button>
			<Button
				class=" text-red-500 hover:bg-red-500 duration-300"
				outline
				color="red"
				onclick={() => {}}>Remove</Button
			>
		</div>
	</div>
	<form
		action="/main/create-project?/feature"
		method="post"
		use:enhance={({ formData }) => {
			isOpen = false;
			isUploading = true;
			files.forEach((file) => {
				formData.append(`images[]`, file);
			});
			return async ({ update, result }) => {
				isUploading = false;
				if (result.type === 'success') feature.photos = (result.data as Feature).photos;
				await update();
			};
		}}
	>
		<Modal
			bodyClass=" !bg-background-default px-6 pb-4 pt-10"
			footerClass=" !bg-background-default px-6 py-6"
			bind:open={isOpen}
			outsideclose
		>
			<div class=" flex flex-col gap-8">
				<Input bind:value={feature.title} title="Title" name="feature-title" required />
				<Input bind:value={feature.description} title="Description" name="feature-description" />
				<Input bind:value={feature.demoUrl} title="Demo url" name="feature-demo-url" />
				<FileListUpload bind:files title="Images" description="Your feature preview images" />
			</div>
			<svelte:fragment slot="footer">
				<div class=" flex gap-4">
					<Button type="submit" shadow color="dark">Submit</Button>
					<Button color="alternative">Cancel</Button>
				</div>
			</svelte:fragment>
		</Modal>
	</form>
</div>
