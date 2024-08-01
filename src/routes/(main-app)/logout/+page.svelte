<script>
	import { goto } from '$app/navigation';
	import { signOutFirebase } from '$lib/firebase/authentication';
	import { onMount } from 'svelte';

	onMount(() => {
		signOutFirebase();
		goto('/');
	});
</script>
