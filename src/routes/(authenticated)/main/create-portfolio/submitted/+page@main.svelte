<script>
	import Confetti from '$lib/components/Confetti.svelte';
	import { portfolioFormStore } from '$lib/stores/portfolio-form.svelte';
	import { onMount } from 'svelte';
	import { draw, fly } from 'svelte/transition';
	import { Button, Carousel } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';

	const { data } = $props();

	onMount(() => {
		portfolioFormStore.reset();
	});

	let ready = $state(false);
	onMount(() => (ready = true));
</script>

{#key ready}
	<div
		in:fly={{ duration: 700, delay: 400, y: -50 }}
		class=" relative flex-1 flex flex-col justify-center items-center gap-10"
	>
		<div class=" py-10 relative flex-1 flex flex-col justify-center items-center gap-10">
			<div class=" z-10">
				<svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 512 512"
					><path
						in:draw={{ duration: 1500 }}
						fill="none"
						stroke="currentColor"
						stroke-miterlimit="10"
						stroke-width="22"
						d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
					/><path
						in:draw={{ duration: 1500 }}
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="22"
						d="M352 176L217.6 336L160 272"
					/></svg
				>
			</div>
			<h1
				in:fly={{ duration: 700, delay: 400, y: -50 }}
				class=" z-10 text-center text-4xl font-bold"
			>
				Create portfolio successfully
			</h1>
			<div class=" z-10 flex flex-col items-center gap-4">
				<h2 in:fly={{ duration: 700, delay: 700, y: -50 }} class=" text-center text-lg font-medium">
					Now you can view detail your portfolio and share it to everybody
				</h2>
				<a
					target="_blank"
					href="/portfolio/{data.portfolio.id}"
					class=" px-4 py-2 flex gap-2 rounded-lg bg-background-default dark:bg-foreground-100 border-[1px] border-foreground-800 text-foreground-800 font-medium"
				>
					{data.portfolio.user.name} - Portfolio
					<Icon icon="ion:arrow-up-right-box-outline" class=" text-foreground-900" />
				</a>
				<div
					in:fly={{ duration: 700, delay: 1000, y: -50 }}
					class=" mt-4 flex flex-col md:flex-row gap-4 md:gap-8"
				>
					<a href="/main/create-project?prev=true">
						<Button color="light">
							<div class=" flex gap-2 items-center">
								<Icon class=" text-foreground-800 text-lg" icon="ion:git-branch-outline" />
								<p class=" font-medium">Add more project</p>
							</div>
						</Button>
					</a>
					<a href="/main/create-portfolio">
						<Button color="light">
							<div class=" flex gap-2 items-center">
								<Icon class=" text-foreground-800 text-lg" icon="ion:newspaper-outline" />
								<p class=" font-medium">Create new portfolio</p>
							</div>
						</Button>
					</a>
				</div>
			</div>
			<div class=" z-0 absolute w-36 h-36 bg-primary-500 blur-[6rem]"></div>
		</div>
	</div>
{/key}

<Confetti />
