<script>
	import { draw } from 'svelte/transition';
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 512 512"
	><circle
		in:draw={{ duration: 600, delay: 500 }}
		cx="160"
		cy="96"
		r="48"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
	/><circle
		in:draw={{ duration: 600, delay: 500 }}
		cx="160"
		cy="416"
		r="48"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
	/><path
		in:draw={{ duration: 600, delay: 500 }}
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
		d="M160 368V144"
	/><circle
		in:draw={{ duration: 600, delay: 500 }}
		cx="352"
		cy="160"
		r="48"
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
	/><path
		in:draw={{ duration: 600, delay: 500 }}
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
		d="M352 208c0 128-192 48-192 160"
	/></svg
>
