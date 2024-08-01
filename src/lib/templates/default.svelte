<script lang="ts">
	import type { Portfolio, Project } from '@prisma/client';

	type Props = {
		data: Portfolio;
		projects: Project[];
	};

	const { data, projects }: Props = $props();

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

<div id="main" class=" bg-[#EDF5FC] w-full em:px-4 em:py-20 flex flex-col em:gap-4">
	<div class=" flex flex-col items-center em:gap-16">
		<div style="--delay:0ms" class=" fly flex flex-col items-center em:gap-3">
			<h1 class=" font-light em:text-5xl em:!leading-4">
				{data.user.name}
			</h1>
			<p class=" em:text-lg">{data.user.title}</p>
			<div class=" flex items-center em:gap-2">
				{#if data.user.email}
					<a
						target="_blank"
						href={`mailto:${data.user.email}`}
						class=" em:text-2xl text-foreground-950"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"
							><path
								fill="currentColor"
								d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56m-14.18 92.63l-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26"
							/></svg
						>
					</a>
				{/if}
				{#if data.user.githubUrl}
					<a target="_blank" href={data.user.githubUrl} class=" em:text-2xl text-foreground-950">
						<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"
							><path
								fill="currentColor"
								d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.6 17.6 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4c0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5c-10.2-26.5-24.9-33.6-24.9-33.6c-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8c11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7c-49.7-5.8-102-25.5-102-113.5c0-25.1 8.7-45.6 23-61.6c-2.3-5.8-10-29.2 2.2-60.8a18.6 18.6 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.2 208.2 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.6 18.6 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8c14.3 16.1 23 36.6 23 61.6c0 88.2-52.4 107.6-102.3 113.3c8 7.1 15.2 21.1 15.2 42.5c0 30.7-.3 55.5-.3 63c0 5.4 3.1 11.5 11.4 11.5a19.4 19.4 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7C480 134.9 379.7 32 256 32"
							/></svg
						>
					</a>
				{/if}
			</div>
		</div>
		<p
			style="--delay:200ms"
			class=" fly mx-auto em:px-16 em:max-w-3xl em:text-base text-center italic"
		>
			{data.user.description}
		</p>
		<div style="--delay:400ms" class=" fly flex flex-col em:gap-8 items-center">
			<h2 class=" font-semibold em:text-3xl">Project</h2>
			<div class="sections">
				{#each projects as project (project.id)}
					<div>
						<p>{project.name}</p>
						<p>{project.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	#main {
		--foreground: #272d2d;
		color: var(--foreground);
		font-size: var(--font-size);
	}

	.fly {
		position: relative;
		top: -100px;
		opacity: 0;
		animation: fly 600ms var(--delay) 1 forwards;
	}

	@keyframes fly {
		from {
			top: -80px;
			opacity: 0;
		}
		to {
			top: 0px;
			opacity: 1;
		}
	}

	.sections {
		position: relative;
		display: block;
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
