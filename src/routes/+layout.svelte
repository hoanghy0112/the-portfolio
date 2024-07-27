<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { signInWithGoogle } from '$lib/firebase/authentication';
	import {
		Button,
		DarkMode,
		Dropdown,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import '../app.css';

	const { data, children } = $props();

	const user = $derived(data.user);

	const activeUrl = $page.url.pathname;

	async function onSignin() {
		const { token } = await signInWithGoogle();

		goto(`/login?token=${token}`, { invalidateAll: true });
	}

	const a = $page.url;
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
		{#if user}
			<div class=" ">
				<div class="group">
					<div
						class=" relative group-hover:scale-90 group-active:scale-75 duration-200 cursor-pointer"
					>
						<img class=" w-8 h-8 rounded-full" src={user.photo} alt="User avatar" />
					</div>
				</div>
				<Dropdown>
					<div class=" px-4 py-2 flex flex-row gap-3 items-center">
						<img class=" w-8 h-8 rounded-full" src={user.photo} alt="User avatar" />
						<div class=" flex flex-col gap-0 justify-start">
							<p class=" w-fit text-foreground-700 text-sm font-semibold">{user.name}</p>
							<p class=" text-foreground-500 text-sm max-w-[150px] truncate">{user.email}</p>
						</div>
					</div>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem>
					<DropdownItem href="/logout" data-sveltekit-reload slot="footer">Log out</DropdownItem>
				</Dropdown>
			</div>
		{:else}
			<Button size="sm" onclick={onSignin}>Sign in</Button>
		{/if}
		<NavHamburger />
	</div>
	<NavUl {activeUrl} class="order-1">
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/contact">Contact</NavLi>
		<NavLi href="/documentation">Documentation</NavLi>
	</NavUl>
</Navbar>

<div class=" overflow-hidden">
	{#key data.pathname}
		<div
			in:fly={{ x: -200, duration: 300, delay: 300 }}
			out:fly={{ x: 200, duration: 300 }}
			class=" px-16 py-8"
		>
			{@render children()}
		</div>
	{/key}
</div>
