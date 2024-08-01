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
		NavUl,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterLink
	} from 'flowbite-svelte';
	import { fly } from 'svelte/transition';
	import LOGO from '$lib/assets/logo.png';
	import '../app.css';
	import { onMount } from 'svelte';

	const { data, children } = $props();

	const user = $derived(data.user);

	const activeUrl = $page.url.pathname;

	async function onSignin() {
		const { token } = await signInWithGoogle();

		goto(`/login?token=${token}`, { invalidateAll: true });
	}

	let showNav = $state(true);
	let lastScrollPosition = $state(0);
	let scrollY = $state(0);

	$effect(() => {
		let currentScrollposition = scrollY;
		if (currentScrollposition > lastScrollPosition) {
			showNav = false;
		}
		if (currentScrollposition < lastScrollPosition) {
			showNav = true;
		}
		lastScrollPosition = currentScrollposition;
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Yellowtail&display=swap" rel="stylesheet" />

	<title>The Portfolio</title>
</svelte:head>

<svelte:window bind:scrollY />

<div class=" relative h-svh flex flex-col">
	<Navbar
		class={` z-20 bg-white shadow-lg dark:shadow-none dark:!bg-background-default  absolute ${showNav ? 'top-0' : '-top-20'} duration-300`}
	>
		<NavBrand href="/">
			<img src={LOGO} class=" lg:pl-12 me-3 h-6 sm:h-9" alt="The Portfolio Logo" />
			<span
				style="font-family: 'Yellowtail', cursive; font-weight: 400; font-style: normal; "
				class=" hidden md:block self-center whitespace-nowrap text-4xl font-semibold dark:text-white"
			>
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
			<NavLi href="/welcome">About</NavLi>
			<NavLi href="/contact">Contact</NavLi>
			<NavLi href="/documentation">Documentation</NavLi>
		</NavUl>
	</Navbar>

	<div
		onscroll={(e) => {
			//@ts-ignore
			scrollY = e.target?.scrollTop;
		}}
		class=" overflow-x-hidden overflow-y-auto pt-20 flex flex-col flex-1 bg-[rgb(244,244,248)] dark:bg-background-default"
	>
		<div class=" flex flex-col flex-1">
			{#key data.pathname?.split('/').slice(0, 3).join('')}
				<div
					in:fly={{ x: data.isPrev ? -200 : 200, duration: 300, delay: 300 }}
					out:fly={{ x: data.isPrev ? 200 : -200, duration: 300 }}
					class=" flex-1 flex flex-col"
				>
					{@render children()}
				</div>
			{/key}
		</div>

		<div class=" px-4 lg:px-16 pt-12 pb-8 bg-[rgb(242,242,248)] dark:bg-background-default">
			<Footer>
				<div class="sm:flex sm:items-center sm:justify-between">
					<FooterCopyright href="/" by="HoangHy™" year={2024} />
					<FooterLinkGroup
						ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
					>
						<FooterLink href="/">About</FooterLink>
						<FooterLink href="/">Privacy Policy</FooterLink>
						<FooterLink href="/">Licensing</FooterLink>
						<FooterLink href="/">Contact</FooterLink>
					</FooterLinkGroup>
				</div>
			</Footer>
		</div>
	</div>
</div>
