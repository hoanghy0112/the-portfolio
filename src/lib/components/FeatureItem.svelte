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

	let title = $state(feature.title);
	let description = $state(feature.description);
	let demoUrl = $state(feature.demoUrl);
	let photos = $state(feature.photos);

	$effect(() => {
		if (isOpen) {
			title = feature.title;
			description = feature.description;
			demoUrl = feature.demoUrl;
			photos = feature.photos;
			files = [];
		}
	});
</script>

<div>
	<div
		in:scale={{ duration: 300 }}
		out:slide={{ duration: 300, axis: 'y' }}
		class=" group flex-1 flex flex-col relative group bg-foreground-100 px-4 py-2 pb-4 rounded-xl"
	>
		<p class=" text-lg font-semibold text-foreground-900">{feature.title}</p>
		{#if feature.description}
			<p class=" text-foreground-600 flex-1 truncate">{feature.description}</p>
		{/if}
		{#if feature.demoUrl}
			<a
				href={feature.demoUrl}
				target="_blank"
				class=" mt-2 text-sm flex items-center text-foreground-900 w-fit px-2 py-1 rounded-md bg-foreground-200 hover:bg-foreground-300 gap-2 duration-200 cursor-pointer"
			>
				<Icon icon="ion:link-outline" class=" text-base" />
				<p class=" text-xs font-medium">{feature.demoUrl}</p>
			</a>
		{/if}
		<div class=" hidden justify-end gap-4 group-hover:flex">
			<Button
				class=" duration-300"
				outline
				color="dark"
				onclick={() => {
					isOpen = true;
				}}>Edit</Button
			>
			<Button
				class=" text-red-500 hover:bg-red-500 duration-300"
				outline
				color="red"
				onclick={onRemove}>Remove</Button
			>
		</div>
	</div>
	<form
		action="/main/create-project?/feature"
		method="post"
		enctype="multipart/form-data"
		use:enhance={({ formData }) => {
			isOpen = false;
			isUploading = true;
			files.forEach((file) => {
				formData.append(`images[]`, file);
			});
			feature.title = title;
			feature.description = description;
			feature.demoUrl = demoUrl;
			feature.photos = photos;

			return async ({ update, result }) => {
				isUploading = false;
				if (result.type === 'success') feature.photos.push(...(result.data as Feature).photos);
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
				<Input bind:value={title} title="Title" name="feature-title" required />
				<Input bind:value={description} title="Description" name="feature-description" />
				<Input bind:value={demoUrl} title="Demo url" name="feature-demo-url" />
				<FileListUpload
					bind:files
					bind:fileUrls={photos}
					title="Images"
					description="Your feature preview images"
				/>
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
