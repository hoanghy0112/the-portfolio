<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import Text from '$lib/components/Text.svelte';
	import type { Project } from '@prisma/client';
	import { Tooltip } from 'flowbite-svelte';

	type Props = {
		data: Project;
	};

	const { data }: Props = $props();
</script>

<div id="main" class=" bg-[#f8f8f3] w-full em:py-24 flex flex-col em:gap-16">
	<div class=" flex flex-col items-center em:gap-3">
		<h1 style="--delay:0ms" class="fly font-light em:text-4xl lg:em:text-5xl em:!leading-4">
			{data.name}
		</h1>
		<Text
			style="--delay:300ms"
			isDisplayed={!!data.description}
			class=" fly mx-auto lg:em:px-16 em:max-w-3xl em:text-base text-center font-light italic"
		>
			{data.description}
		</Text>
		<div style="--delay:600ms" class=" fly em:mx-4 em:mt-8 flex flex-col items-center em:gap-4">
			{#each data.repoUrls as repo (repo.url)}
				<div>
					<Anchor
						isDisplayed={true}
						target="_blank"
						href={repo.url}
						class=" underline underline-offset-2 lg:em:text-2xl flex flex-col md:flex-row em:gap-1 items-center text-foreground-950"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"
							><path
								fill="currentColor"
								d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.6 17.6 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4c0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8c11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1 8.7-45.6 23-61.6c-2.3-5.8-10-29.2 2.2-60.8a18.6 18.6 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.2 208.2 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.6 18.6 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8c14.3 16.1 23 36.6 23 61.6c0 88.2-52.4 107.6-102.3 113.3c8 7.1 15.2 21.1 15.2 42.5c0 30.7-.3 55.5-.3 63c0 5.4 3.1 11.5 11.4 11.5a19.4 19.4 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7C480 134.9 379.7 32 256 32"
							/></svg
						>
						<span class=" text-center text-base">{repo.name}</span>
					</Anchor>
					<Tooltip>
						<div class=" flex flex-col gap-1">
							<p class=" font-semibold">{repo.name}</p>
							<p class="">{repo.description}</p>
						</div>
					</Tooltip>
				</div>
			{/each}
		</div>
	</div>
	<div style="--delay:800ms" class=" fly w-full flex flex-col em:gap-10 items-center">
		<h2 class=" font-medium em:text-xl lg:em:text-3xl underline underline-offset-8">Feature</h2>
		<div class="sections w-full flex flex-col em:gap-20">
			{#each data.features as feature (feature.title)}
				<div class="">
					<div class=" mx-auto w-fit text-center em:p-2 lg:em:px-8 lg:em:py-4 rounded-xl">
						<Text class=" w-fit text-slate-900 em:text-xl font-medium text-center flex mx-auto">
							{feature.title}
						</Text>
						<p class=" em:mt-1 md:em:mx-4 lg:em:mx-10 font-light text-slate-700">
							{feature.description}
						</p>
					</div>
					{#if feature.photos.length > 1}
						<div
							style="--time: {feature.photos.length * 4}s"
							class=" marquee-wrapper em:mt-4 pb-8 flex em:gap-4 lg:em:gap-6 w-full overflow-hidden"
						>
							<div class=" marquee flex items-stretch em:gap-4 lg:em:gap-6">
								{#each feature.photos as photo (photo)}
									<div class=" h-full w-[300px] md:w-[400px] lg:em:w-[600px]">
										<img
											class=" h-full w-full object-cover shadow-xl rounded-xl"
											src={photo}
											alt="feature preview"
										/>
									</div>
								{/each}
							</div>
							<div class=" marquee flex items-stretch em:gap-4 lg:em:gap-6">
								{#each feature.photos as photo (photo)}
									<div class=" h-full w-[300px] md:w-[400px] lg:em:w-[600px]">
										<img
											class=" h-full w-full object-cover shadow-xl rounded-xl"
											src={photo}
											alt="feature preview"
										/>
									</div>
								{/each}
							</div>
							<div class=" marquee flex items-stretch em:gap-4 lg:em:gap-6">
								{#each feature.photos as photo (photo)}
									<div class=" h-full w-[300px] md:w-[400px] lg:em:w-[600px]">
										<img
											class=" h-full w-full object-cover shadow-xl rounded-xl"
											src={photo}
											alt="feature preview"
										/>
									</div>
								{/each}
							</div>
						</div>
					{:else if feature.photos.length === 1}
						<div class=" em:mt-4 mx-auto w-full lg:em:w-[800px] rounded-none">
							<img
								class=" w-full object-cover shadow-xl rounded-none md:rounded-xl"
								src={feature.photos.at(0)}
								alt="feature preview"
							/>
						</div>
					{/if}
				</div>
			{/each}
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

	.marquee {
		animation: marquee var(--time) linear infinite;
	}

	.marquee-wrapper:hover .marquee {
		animation-play-state: paused;
	}

	@keyframes marquee {
		from {
			transform: translateX(0%);
		}
		to {
			transform: translateX(-100%);
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
