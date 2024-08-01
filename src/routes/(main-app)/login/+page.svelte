<script>
	import { Button, Label } from 'flowbite-svelte';

	const { data } = $props();

	let user = $state(data.user);
</script>

<div class=" flex flex-col items-center gap-10">
	<h1 class=" w-full text-xl font-medium text-center">Update profile</h1>
	<form class=" flex flex-col gap-10 items-center" method="post" action="">
		<div>
			<div class=" flex flex-col">
				<Label for="display-name" class="block mb-2">Display name</Label>
				<input
					id="display-name"
					name="name"
					class=" w-full bg-background-default border-0 border-b-2 focus:border-primary-600 text-lg lg:text-2xl font-medium px-0"
					type="text"
					bind:value={user.name}
					required
					aria-required="true"
				/>
			</div>
		</div>
		<Button class="" type="submit">Update information</Button>
	</form>
</div>

<style>
	#display-name:focus {
		box-shadow: none;
	}
</style>
