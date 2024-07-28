<script lang="ts">
	import type { Portfolio } from '@prisma/client';
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

	// $effect(() => {
	// 	console.log({ frame, a: frame?.contentDocument?.body, Template });
	// 	if (!frame || !frame?.contentDocument || !Template) return;
	// 	// frame.onload = (e) => {
	// 	// 	if (!frame) return;
	// 	// 	const app = new Template({
	// 	// 		target: frame.contentDocument?.body,
	// 	// 		props: { data }
	// 	// 	});
	// 	// };
	// 	const app = mount(Template, {
	// 		target: frame.contentDocument.body,
	// 		props: { data }
	// 	});
	// 	frame.contentDocument.head.replaceWith(document.head.cloneNode(true));

	// 	return () => {
	// 		unmount(app);
	// 	};
	// });
</script>

{#if Template}
	<div class=" w-full flex-1 flex overflow-hidden rounded-2xl">
		<svelte:component this={Template} {data} />
		<!-- <iframe class=" w-full flex-1" bind:this={frame} title="Portfolio preview"></iframe> -->
	</div>
{/if}
