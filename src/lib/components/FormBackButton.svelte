<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { GradientButton } from 'flowbite-svelte';

	type Props = {
		destinationUrl: string;
		title?: string;
	};

	const { destinationUrl, title = 'Back' }: Props = $props();
</script>

<div>
	<GradientButton outline class="w-fit" color="cyanToBlue" onclick={() => goto(destinationUrl)}>
		<div class=" flex items-center gap-2">
			<Icon icon="ion:chevron-back-outline" class="mt-[1px] -ml-1" font-size={18} />
			<p class=" font-medium">{title}</p>
		</div>
	</GradientButton>
</div>
