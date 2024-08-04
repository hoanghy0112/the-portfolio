<script lang="ts">
	import type { PortfolioStatistic } from '$lib/types/portfolio-statistic';
	import { Chart } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		data: PortfolioStatistic['visitTimeOfEachProject'];
	};

	const { data }: Props = $props();

	let isDark = $state(document.querySelector(':root')?.classList.contains('dark'));

	onMount(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					if (document.querySelector(':root')?.classList.contains('dark')) isDark = true;
					else isDark = false;
				}
			});
		});
		const rootElement = document.querySelector(':root');
		if (rootElement) observer.observe(rootElement, { attributes: true });
	});

	let nf = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		maximumFractionDigits: 1
	});

	let options = $state<ApexCharts.ApexOptions>();

	$effect(() => {
		options = {
			series: data.map((v) => v.visitTime / 1000),
			colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
			chart: {
				height: 320,
				width: '100%',
				type: 'donut' as const
			},
			stroke: {
				colors: ['transparent']
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
							name: {
								show: true,
								fontFamily: 'Inter, sans-serif',
								offsetY: 20
							},
							total: {
								showAlways: true,
								show: true,
								label: 'Total visit time',
								fontFamily: 'Inter, sans-serif',
								color: isDark ? 'white' : 'black',
								formatter: function (w: any) {
									const sum = w.globals.seriesTotals.reduce((a: number, b: number) => {
										return a + b;
									}, 0);
									return `${nf.format(sum)}s`;
								}
							},
							value: {
								show: true,
								fontFamily: 'Inter, sans-serif',
								offsetY: -20,
								fontWeight: '600',
								color: isDark ? 'white' : 'black',
								formatter: function (value: number) {
									return `${nf.format(value)}s`;
								}
							}
						},
						size: '80%'
					}
				}
			},
			grid: {
				padding: {
					top: -2
				}
			},
			labels: data.map((v) => v.project.name),
			dataLabels: {
				enabled: false
			},
			legend: {
				position: 'bottom' as const,
				fontFamily: 'Inter, sans-serif',
				labels: {
					colors: isDark ? 'white' : 'black'
				}
			},
			yaxis: {
				labels: {
					formatter: function (value: number) {
						return `${nf.format(value)}s`;
					}
				}
			},
			xaxis: {
				labels: {
					formatter: function (value: number) {
						return `${nf.format(value)}s`;
					}
				},
				axisTicks: {
					show: false
				},
				axisBorder: {
					show: false
				}
			}
		} as unknown as ApexCharts.ApexOptions;
	});
</script>

<div
	class={twMerge(
		'lg:min-w-[250px] flex flex-col gap-4 items-center px-0 py-4 border-[1px] border-foreground-300 shadow-lg rounded-lg shadow-foreground-300 dark:shadow-none dark:border-[1px] dark:border-foreground-300'
	)}
>
	{#if options}
		<Chart {options} class="py-0" />
	{/if}
</div>
