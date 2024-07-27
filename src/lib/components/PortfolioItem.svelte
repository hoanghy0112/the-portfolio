<script lang="ts">
	import type { Portfolio } from '@prisma/client';
	import { Card } from 'flowbite-svelte';

	type Props = { portfolio: Portfolio };

	const { portfolio }: Props = $props();
</script>

<Card href="/cards">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		Noteworthy technology acquisitions 2021
	</h5>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
		Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological
		order.
	</p>
</Card>
