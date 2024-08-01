<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type Portfolio, type Project } from '@prisma/client';
	import { Modal } from 'flowbite-svelte';
	import { mount, unmount } from 'svelte';

	type Props = {
		data: Portfolio;
		theme: string;
	};

	const { data, theme = 'default' }: Props = $props();

	let Template = $state<any>();

	$effect(() => {
		(async () => {
			Template = (await import(`$lib/templates/${theme}.svelte`)).default;
		})();
	});

	let frame = $state<HTMLIFrameElement>();
	let isModalOpen = $state(false);

	let projects = $state<Project[] | undefined>();

	$effect(() => {
		(async () => {
			projects = (await Promise.all(
				data.projectIds.map(async (id) => (await fetch(`/main/project/${id}`)).json())
			)) as Project[];
		})();
	});

	$effect(() => {
		if (!frame || !frame?.contentDocument || !Template) return;
		// frame.onload = (e) => {
		// 	if (!frame) return;
		// 	const app = new Template({
		// 		target: frame.contentDocument?.body,
		// 		props: { data }
		// 	});
		// };
		const app = mount(Template, {
			target: frame.contentDocument.body,
			props: { data }
		});
		frame.contentDocument.head.replaceWith(document.head.cloneNode(true));

		return () => {
			unmount(app);
		};
	});
</script>

{#if Template && projects}
	<div class="group relative w-full flex">
		<div class=" paper w-full flex flex-col shadow-lg rounded-2xl overflow-hidden">
			<svelte:component this={Template} {data} {projects} --font-size="14px" />
		</div>
		<button
			onclick={() => (isModalOpen = true)}
			class=" lg:opacity-0 group-hover:opacity-100 duration-200 absolute top-2 right-2 p-2 bg-[#46464649] hover:bg-[#46464669] active:bg-[#46464689] rounded-lg"
		>
			<Icon icon="ion:scan" class=" text-foreground-100 text-xl" />
		</button>
		<Modal
			classBackdrop="p-0"
			class="p-0"
			classDialog="p-0"
			classBody=" p-0"
			classFooter="p-0"
			classHeader="p-0"
			size="xl"
			bind:open={isModalOpen}
			outsideclose
		>
			<div class=" md:-m-0">
				{#key isModalOpen}
					<svelte:component this={Template} {data} {projects} --font-size="16px" />
				{/key}
			</div>
		</Modal>
	</div>
{/if}

<style>
	@media (min-width: 1024px) {
		.paper {
			/* transform: perspective(900px) rotateX(0deg) rotateY(-10deg); */
		}
	}
</style>
