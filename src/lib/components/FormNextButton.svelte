<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { type TErrorList } from '$lib/stores/error-state-generator.svelte';

	type Props = {
		errors: TErrorList;
		destinationUrl: string;
		title?: string;
	};

	const { errors, destinationUrl, title = 'Next step' }: Props = $props();
</script>

<GradientButton
	shadow
	color="cyanToBlue"
	class="w-fit"
	onclick={() => {
		if (errors.every((e) => !e.message)) goto(destinationUrl);
		else {
			const element = errors.find((e) => e.message)?.element;
			if (element) element.focus();
		}
	}}
>
	<div class=" flex items-center gap-2">
		<p class=" font-medium">{title}</p>
		<Icon icon="ion:arrow-forward-outline" class="mt-[1px]" font-size={18} />
	</div>
</GradientButton>
