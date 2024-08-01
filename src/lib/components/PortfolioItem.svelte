<script lang="ts">
	import type { Portfolio } from '@prisma/client';
	import { Card } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { getTechnologyInfo } from '$lib/utils/technologies';
	import { Button, Carousel } from 'flowbite-svelte';
	import { scale } from 'svelte/transition';

	type Props = { portfolio: Portfolio };

	const { portfolio }: Props = $props();

	let isDeleting = $state(false);
</script>

<div
	class="group flex {isDeleting ? 'blur-md' : 'blur-0'} duration-500"
	out:scale={{ duration: 300, start: 0.2 }}
>
	<div
		class=" main relative w-72 md:w-96 rounded-xl overflow-hidden flex flex-col bg-white dark:bg-foreground-100 shadow-lg dark:border-[0.5px] dark:border-foreground-400 duration-[600ms]"
	>
		<div
			class=" back px-20 flex flex-col justify-center items-stretch gap-4 opacity-0 delay-[200ms] scale-105 z-20 rounded-xl group-hover:opacity-100 absolute w-full h-full top-0 left-0 bg-background-default"
		>
			<Button color="light">Create portfolio</Button>
			<Button color="light">Edit</Button>
			<form
				use:enhance={() => {
					isDeleting = true;
					return async ({ update }) => {
						await update();
					};
				}}
				class=" w-full flex flex-col"
				action={`/main/portfolio/${portfolio.id}?/delete`}
				method="post"
			>
				<Button type="submit" outline color="red">Delete</Button>
			</form>
		</div>
	</div>
</div>

<style>
	div:hover .main {
		/* transform: perspective(900px) translate3d(0px, -10px, -80px) rotate3d(1, 0, 0, 20deg); */
		transform: perspective(900px) translate3d(0px, -0px, -100px) rotate3d(0, 1, 0, 180deg);
	}

	div:hover .back {
		/* transform: perspective(900px) translate3d(0px, -10px, -80px) rotate3d(1, 0, 0, 20deg); */
		transform: perspective(900px) rotate3d(0, 1, 0, 180deg);
	}
</style>
