<script lang="ts">
	import type { Portfolio } from '@prisma/client';

	type Props = {
		data: Portfolio;
	};

	const { data }: Props = $props();
</script>

<div id="main" class=" rounded-xl bg-[#EDF5FC] w-full px-4 py-10 flex flex-col gap-4">
	<div class=" flex flex-col items-center em:gap-4">
		<h1 class=" font-light em:text-4xl em:!leading-4">
			{data.user.name}
		</h1>
		<p class=" em:text-base">{data.user.title}</p>
		<div class=" flex em:gap-2">
			<a
				target="_blank"
				href={`mailto:${data.user.email}`}
				class=" em:text-base text-foreground-950"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512"
					><path
						fill="currentColor"
						d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56m-14.18 92.63l-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26"
					/></svg
				>
			</a>
		</div>
	</div>
</div>

<style>
	#main {
		--foreground: #272d2d;
		color: var(--foreground);
		font-size: var(--font-size);
	}
</style>
