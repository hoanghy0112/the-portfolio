<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Feature } from '@prisma/client';
	import { Button, Modal } from 'flowbite-svelte';
	import FileListUpload from './FileListUpload.svelte';
	import Input from './Input.svelte';

	type Props = {
		isUploading?: boolean;
		onSubmit?: (feature: Feature) => any;
	};

	let { isUploading = $bindable(false), onSubmit = () => {} }: Props = $props();

	let isOpen = $state(false);
	let files = $state<File[]>([]);
</script>

<div>
	<Button
		onclick={() => {
			isOpen = true;
		}}
		class=" mb-4 w-full"
		color="dark">Add new feature</Button
	>
	<form
		action="/main/create-project?/feature"
		enctype="multipart/form-data"
		method="post"
		use:enhance={({ formData }) => {
			isOpen = false;
			isUploading = true;
			files.forEach((file) => {
				formData.append(`images[]`, file);
			});
			return async ({ update, result }) => {
				isUploading = false;
				if (result.type === 'success') onSubmit(result.data as Feature);
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
				<Input title="Title" name="feature-title" required />
				<Input title="Description" name="feature-description" />
				<Input title="Demo url" name="feature-demo-url" />
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
