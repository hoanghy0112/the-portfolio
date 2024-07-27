<script>
	import { page } from '$app/stores';
	import { signInWithGoogle } from '$lib/firebase/authentication';
	import { Button, DarkMode, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	import { goto } from '$app/navigation';
	import '../app.css';

	const activeUrl = $page.url.pathname;

	async function onSignin() {
		const { token } = await signInWithGoogle();

		goto(`/login?token=${token}`);
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			ThePortfolio
		</span>
	</NavBrand>
	<div class="flex gap-2 md:order-2">
		<DarkMode />
		<Button size="sm" onclick={onSignin}>Sign in</Button>
		<NavHamburger />
	</div>
	<NavUl {activeUrl} class="order-1">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/contact">Contact</NavLi>
		<NavLi href="/documentation">Documentation</NavLi>
	</NavUl>
</Navbar>

<div class=" px-16 py-8">
	<slot />
</div>
