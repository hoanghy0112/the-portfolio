<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		title: string;
		description?: string;
		onclick?: () => any;
	};

	const { title, description = '', onclick = () => {} }: Props = $props();
</script>

<button
	class=" flex-none main w-[200px] md:w-[300px] px-8 py-20 rounded-xl shadow-md dark:shadow-none bg-white dark:bg-foreground-100 hover:bg-foreground-50 dark:hover:bg-foreground-200 hover:shadow-lg active:scale-75 duration-300 cursor-pointer grid place-items-center gap-2"
	{onclick}
>
	<div class=" grid gap-4 place-items-center">
		<Icon icon="ion:easel" class=" text-4xl text-foreground-900 animate-bounce" />
		<div>
			<p class=" font-semibold text-lg text-foreground-900">{title}</p>
			<p class=" mt-2 leading-5 text-foreground-700">{description}</p>
		</div>
	</div>
</button>

<style>
	.main:hover {
		transform: perspective(900px) translate3d(0px, -10px, -80px) rotate3d(1, 0, 0, 20deg);
	}
</style>
