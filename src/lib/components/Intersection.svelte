<script lang="ts">
	import { onMount, untrack, type Snippet } from 'svelte';

	type Props = {
		intersecting?: boolean;
		intersectOnce?: boolean;
		children: Snippet<[{ intersecting: boolean; intersectOnce: boolean; ratio: number }]>;
		defaultRatio?: number;
		onIntersect?: (ratio: number) => any;
		onIntersectOnce?: () => any;
		onEscape?: () => any;
	};

	let {
		intersecting = $bindable(false),
		intersectOnce = $bindable(false),
		children,
		defaultRatio = 0,
		onIntersect = () => {},
		onIntersectOnce = () => {},
		onEscape = () => {}
	}: Props = $props();

	let element = $state<HTMLDivElement>();
	let ratio = $state<number>(0);

	function buildThresholdList() {
		let thresholds = [];
		let numSteps = 20;

		for (let i = 1.0; i <= numSteps; i++) {
			let r = i / numSteps;
			thresholds.push(r);
		}

		thresholds.push(0);
		return thresholds;
	}

	$effect(() => {
		if (intersectOnce) untrack(onIntersectOnce);
	});

	$effect(() => {
		if (intersectOnce && !intersecting) {
			untrack(onEscape);
		}
	});

	$effect(() => {
		if (!element?.getBoundingClientRect().height) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				ratio = entry.intersectionRatio;
				if (entry.isIntersecting && ratio > defaultRatio) {
					if (!intersecting) untrack(() => onIntersect(ratio));
					intersectOnce = true;
					intersecting = true;
				} else {
					intersecting = false;
				}
			},
			{ threshold: buildThresholdList() }
		);

		observer.observe(element);
	});
</script>

<div bind:this={element}>
	{@render children({ intersecting, intersectOnce, ratio })}
</div>
