<script>
	import Icon from '@iconify/svelte';
	import { Button } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	import LOGO from '$lib/assets/logo.png';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class=" px-4 lg:px-16 flex-1 flex flex-col gap-1">
	<div class=" h-screen flex flex-col justify-center">
		<p class=" text-foreground-700 font-medium">Welcome to</p>
		<div class=" w-fit flex gap-4">
			<p id="app-name">The Portfolio</p>
			<img src={LOGO} alt="App logo" class=" w-14 h-14" />
		</div>
	</div>
	<div>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
		<p>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint quisquam possimus corporis
			exercitationem consequatur ad nostrum quasi? Provident ipsum nemo possimus commodi ipsa, cum,
			reiciendis enim temporibus fugit, earum aut!
		</p>
	</div>
</div>

<style>
	#app-name {
		font-size: 60px;
		font-weight: 700;
		font-family: 'Montserrat', sans-serif;
		font-optical-sizing: auto;
		font-style: normal;
		background: -webkit-linear-gradient(45deg, #00ff38, #00b8bb, #0094ff);
		background-clip: text;
		text-shadow:
			20px 20px 150px #00ff38,
			-20px -20px 150px #0094ff;
		-webkit-text-fill-color: transparent;
	}
</style>
