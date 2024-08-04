<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import Intersection from './Intersection.svelte';

	type Props = {
		onUnLoad?: (time: number) => any;
		children: Snippet;
	};

	const { onUnLoad = () => {}, children }: Props = $props();

	let timer = $state(0);
	let focusTime = $state(new Date());
	let intersectOnce = $state(false);
	let intersecting = $state(false);

	onMount(() => {
		const unload = () => {
			if (intersecting) timer += new Date().getTime() - focusTime.getTime();
			if (intersectOnce) onUnLoad(timer);
		};

		window.addEventListener('beforeunload', unload);

		return () => {
			window.removeEventListener('beforeunload', unload);
		};
	});
</script>

<Intersection
	defaultRatio={0.8}
	bind:intersectOnce
	bind:intersecting
	onIntersect={() => {
		focusTime = new Date();
	}}
	onEscape={() => {
		timer += new Date().getTime() - focusTime.getTime();
	}}
>
	{@render children()}
</Intersection>
