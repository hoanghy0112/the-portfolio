<script lang="ts">
	import type { Portfolio } from '@prisma/client';

	type Props = {
		data: Portfolio;
	};

	const { data }: Props = $props();
</script>

<div>
	<p>{data.user.name}</p>
</div>
