<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Portfolio } from '@prisma/client';
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

{#if Template}
	<div class="group relative w-full flex overflow-hidden rounded-2xl">
		<svelte:component this={Template} {data} --font-size="14px" />
		<button
			onclick={() => (isModalOpen = true)}
			class=" opacity-0 group-hover:opacity-100 duration-200 absolute top-2 right-2 p-2 bg-[#46464649] hover:bg-[#46464669] active:bg-[#46464689] rounded-lg"
		>
			<Icon icon="ion:scan" class=" text-foreground-100 text-xl" />
		</button>
		<Modal size="xl" bind:open={isModalOpen} outsideclose>
			<svelte:component this={Template} {data} --font-size="18px" />
		</Modal>
		<!-- <iframe class=" w-full min-h-[300px] flex-1" bind:this={frame} title="Portfolio preview"></iframe> -->
	</div>
{/if}
