<script lang="ts">
	import type { Snippet } from 'svelte';
	import ViewTimeRecord from './ViewTimeRecord.svelte';

	type Props = {
		portfolioId: string;
		projectId: string;
		children: Snippet;
	};

	let { children, portfolioId, projectId }: Props = $props();

	function updateAnalyticData(time: number) {
		fetch(`/portfolio/${portfolioId}/project/${projectId}`, {
			method: 'post',
			body: JSON.stringify({ time }),
			keepalive: true
		});
	}
</script>

<ViewTimeRecord onUnLoad={updateAnalyticData}>
	{@render children()}
</ViewTimeRecord>
