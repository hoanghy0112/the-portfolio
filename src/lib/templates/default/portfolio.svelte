<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import Link from '$lib/components/Link.svelte';
	import Text from '$lib/components/Text.svelte';
	import type { Portfolio, Project } from '@prisma/client';
	import { Carousel } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		data: Portfolio;
		projects: Project[];
	};

	const { data, projects }: Props = $props();

	let index = $state(data.projectIds.map(() => 0));
	let forward = true;

	const sections = document.querySelectorAll('.section');

	let config = {
		rootMargin: '0px',
		threshold: 0.5
	};

	let observer = new IntersectionObserver((entries) => {
		console.log(entries);
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				intersectionHandler(entry);
			}
		});
	}, config);

	sections.forEach((section) => {
		observer.observe(section);
	});

	function intersectionHandler(entry: any) {
		const current = document.querySelector('.section.active');
		const next = entry.target;
		const header = next.querySelector('.section--header');

		if (current) {
			current.classList.remove('active');
		}
		if (next) {
			next.classList.add('active');
			document.body.style.setProperty('--color-bg', next.dataset.bgcolor);
		}
	}
</script>

<div
	id="main"
	class=" bg-[#f8f8f3] w-full h-screen overflow-auto snap-y snap-mandatory em:px-4 em:py-24 flex flex-col em:gap-4"
>
	<div class=" flex flex-col items-center em:gap-16">
		<div style="--delay:0ms" class=" snap-center fly flex flex-col items-center em:gap-3">
			<h1 class=" font-light em:text-4xl lg:em:text-5xl em:!leading-4">
				{data.user.name}
			</h1>
			<Text isDisplayed={!!data.user.title} class=" em:text-base lg:em:text-lg font-light">
				{data.user.title}
			</Text>
			<div class=" em:mt-8 flex flex-col items-center em:gap-4">
				<Text
					isDisplayed={!!data.user.phone}
					class=" flex em:gap-1 items-center lg:em:text-2xl text-foreground-950"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.5rem"
						height="1.5rem"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M391 480c-19.52 0-46.94-7.06-88-30c-49.93-28-88.55-53.85-138.21-103.38C116.91 298.77 93.61 267.79 61 208.45c-36.84-67-30.56-102.12-23.54-117.13C45.82 73.38 58.16 62.65 74.11 52a176.3 176.3 0 0 1 28.64-15.2c1-.43 1.93-.84 2.76-1.21c4.95-2.23 12.45-5.6 21.95-2c6.34 2.38 12 7.25 20.86 16c18.17 17.92 43 57.83 52.16 77.43c6.15 13.21 10.22 21.93 10.23 31.71c0 11.45-5.76 20.28-12.75 29.81c-1.31 1.79-2.61 3.5-3.87 5.16c-7.61 10-9.28 12.89-8.18 18.05c2.23 10.37 18.86 41.24 46.19 68.51s57.31 42.85 67.72 45.07c5.38 1.15 8.33-.59 18.65-8.47c1.48-1.13 3-2.3 4.59-3.47c10.66-7.93 19.08-13.54 30.26-13.54h.06c9.73 0 18.06 4.22 31.86 11.18c18 9.08 59.11 33.59 77.14 51.78c8.77 8.84 13.66 14.48 16.05 20.81c3.6 9.53.21 17-2 22c-.37.83-.78 1.74-1.21 2.75a176.5 176.5 0 0 1-15.29 28.58c-10.63 15.9-21.4 28.21-39.38 36.58A67.4 67.4 0 0 1 391 480"
						/>
					</svg>
					<span class=" text-base">{data.user.phone}</span>
				</Text>
				<Anchor
					isDisplayed={!!data.user.email}
					target="_blank"
					href={`mailto:${data.user.email}`}
					class=" lg:em:text-2xl flex em:gap-1 items-center text-foreground-950"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"
						><path
							fill="currentColor"
							d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56m-14.18 92.63l-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26"
						/></svg
					>
					<span class=" text-base">{data.user.email}</span>
				</Anchor>
				<Anchor
					target="_blank"
					isDisplayed={!!data.user.githubUrl?.split('/').at(3)}
					href={data.user.githubUrl}
					class=" flex em:gap-1 items-center lg:em:text-2xl text-foreground-950"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"
						><path
							fill="currentColor"
							d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.6 17.6 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4c0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8c11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1 8.7-45.6 23-61.6c-2.3-5.8-10-29.2 2.2-60.8a18.6 18.6 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.2 208.2 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.6 18.6 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8c14.3 16.1 23 36.6 23 61.6c0 88.2-52.4 107.6-102.3 113.3c8 7.1 15.2 21.1 15.2 42.5c0 30.7-.3 55.5-.3 63c0 5.4 3.1 11.5 11.4 11.5a19.4 19.4 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7C480 134.9 379.7 32 256 32"
						/></svg
					>
					<span class=" text-base">{data.user.githubUrl?.split('/').at(3)}</span>
				</Anchor>
				<Anchor
					target="_blank"
					isDisplayed={!!data.user.linkedInUrl?.split('/').at(4)}
					href={data.user.linkedInUrl}
					class=" flex em:gap-1 items-center lg:em:text-2xl text-foreground-950"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.5rem"
						height="1.5rem"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"
						/>
					</svg>
					<span class=" text-base">{data.user.linkedInUrl?.split('/').at(4)}</span>
				</Anchor>
				<Anchor
					target="_blank"
					isDisplayed={!!data.user.youtubeUrl?.split('/').at(3)}
					href={data.user.youtubeUrl}
					class=" flex em:gap-1 items-center lg:em:text-2xl text-foreground-950"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1.5rem"
						height="1.5rem"
						viewBox="0 0 512 512"
					>
						<path
							fill="currentColor"
							d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149C1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5c58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5c2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9M207 353.89v-196.5l145 98.2Z"
						/>
					</svg>
					<span class=" text-base">{data.user.youtubeUrl?.split('/').at(3)}</span>
				</Anchor>
			</div>
		</div>
		<Text
			style="--delay:200ms"
			isDisplayed={!!data.user.description}
			class=" fly mx-auto lg:em:px-16 em:max-w-3xl em:text-base text-center font-light italic"
		>
			{data.user.description}
		</Text>
		<div style="--delay:400ms" class=" fly w-full flex flex-col em:gap-10 items-center">
			<h2 class=" snap-center font-medium em:text-xl lg:em:text-3xl underline underline-offset-8">
				My Project
			</h2>
			<div class=" w-full flex flex-col em:gap-20">
				{#each projects as project, projectIndex (project.id)}
					<div class=" snap-center snap-always">
						<div class=" mx-auto w-fit text-center em:p-2 lg:em:px-8 lg:em:py-4 rounded-xl">
							<Link
								href="/portfolio/{data.id}/project/{project.id}"
								class=" cursor-pointer text-slate-900 em:text-xl font-medium flex mx-auto"
							>
								{project.name}
							</Link>
							<p class=" em:mt-1 font-light text-slate-700">{project.description}</p>
						</div>
						<div
							class=" mx-auto em:mt-4 lg:max-w-[700px] h-auto bg-[#f8f8f3] flex flex-col items-center gap-4"
						>
							<div class=" w-full shadow-2xl rounded-xl">
								<Carousel
									let:Controls
									imgClass=" object-cover shadow-2xl "
									images={project.photos.map((v) => ({
										class: ' h-48 object-cover',
										src: v,
										alt: 'Preview'
									}))}
									bind:index={index[projectIndex]}
									duration={6000}
								>
									<Controls />
								</Carousel>
							</div>
							<div class=" w-fit flex justify-center gap-4">
								{#each project.photos as photo, i (photo)}
									<button
										class={twMerge(
											' rounded-lg overflow-hidden cursor-pointer shadow-lg border-none hover:scale-110',
											index[projectIndex] === i ? ' shadow-xl' : ' shadow-none'
										)}
										onclick={() => (index[projectIndex] = i)}
									>
										<img
											src={photo}
											alt="project preview"
											class={twMerge(
												' w-36 h-20 object-cover hover:opacity-90',
												index[projectIndex] === i ? 'opacity-100' : 'opacity-35'
											)}
										/>
									</button>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	#main * {
		transition-duration: 300ms;
	}

	#main {
		--foreground: #272d2d;
		color: var(--foreground);
		font-size: var(--font-size);
	}

	:global(.fly) {
		position: relative;
		top: -100px;
		opacity: 0;
		animation: fly 600ms var(--delay) 1 forwards;
	}

	@keyframes fly {
		from {
			top: -200px;
			opacity: 0;
		}
		to {
			top: 0px;
			opacity: 1;
		}
	}

	.sections {
		position: relative;
		/* padding: 0 6vmax; */
	}

	.section {
		position: relative;
		min-height: 100vh;
	}

	.section--image {
		display: block;
		position: relative;
		max-width: 100%;
		margin: 10vh 0 30vh auto;
		opacity: 0;
		transition: opacity 0.3s;

		.active & {
			opacity: 1;
		}

		img {
			display: block;
			position: relative;
			max-width: 90%;
			max-height: 100vh;
			margin: 0 0 0 auto;
		}
	}

	.section--header {
		font-size: calc(var(--fontsize-text));
		font-family: var(--font-text);
		position: fixed;
		bottom: 5vmax;
		left: 0;
		padding-left: 5vmax;
		z-index: 1000;
		line-height: 1;
		font-weight: 300;
		opacity: 0;
		animation-duration: 0.65s;
		animation-fill-mode: both;

		.active & {
			animation-name: fadeInUp;
		}
	}

	@keyframes fadeInUp {
		0% {
			transform: translate3d(0, 55%, 0);
			opacity: 0;
			transform: translate3d(0, 55%, 0);
		}
		to {
			transform: translateZ(0);
			opacity: 1;
			transform: translateZ(0);
		}
	}
</style>
