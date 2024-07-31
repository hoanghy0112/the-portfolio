<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	type Props = {
		title: string;
		description?: string;
		onclick?: () => any;
	};

	const { title, description = '', onclick = () => {} }: Props = $props();

	let angle = spring(0, {
		stiffness: 0.1,
		damping: 0.15
	});

	onMount(() => {
		let timeout1: NodeJS.Timeout, timeout2: NodeJS.Timeout;
		const interval = setInterval(() => {
			angle.set(10);
			timeout1 = setTimeout(() => {
				angle.set(-15);
			}, 200);
			timeout2 = setTimeout(() => {
				angle.set(0);
			}, 400);
		}, 2000);

		return () => {
			clearInterval(interval);
			if (timeout1) clearTimeout(timeout1);
			if (timeout2) clearTimeout(timeout2);
		};
	});
</script>

<button
	class=" main w-[200px] md:w-[300px] px-8 rounded-xl bg-foreground-100 hover:bg-foreground-200 hover:shadow-lg active:scale-75 duration-300 cursor-pointer grid place-items-center gap-2"
	{onclick}
>
	<div class=" grid gap-4 place-items-center">
		<Icon
			icon="ion:easel"
			class=" text-4xl text-foreground-900"
			style=" transform: rotate({$angle}deg)"
		/>
		<div>
			<p class=" font-semibold text-lg text-foreground-900">{title}</p>
			<p class=" mt-2 leading-5 text-foreground-700">{description}</p>
		</div>
	</div>
</button>

<style>
	.main:hover {
		transform: perspective(900px) translate3d(0px, -10px, 5px) rotate3d(1, 0, 0, 20deg);
	}
</style>
