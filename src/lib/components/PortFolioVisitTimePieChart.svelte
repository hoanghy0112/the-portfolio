<script lang="ts">
	import type { PortfolioStatistic } from '$lib/types/portfolio-statistic';
	import { Chart } from 'flowbite-svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		data: PortfolioStatistic['visitTimeOfEachProject'];
	};

	const { data }: Props = $props();

	let nf = new Intl.NumberFormat('en-US', {
		style: 'decimal',
		maximumFractionDigits: 1
	});

	const options = {
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
			fontFamily: 'Inter, sans-serif'
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
</script>

<div
	class={twMerge(
		'lg:min-w-[250px] flex gap-4 items-center px-4 py-3 border-[1px] border-foreground-300 shadow-lg rounded-lg shadow-foreground-300 dark:shadow-none dark:border-[1px] dark:border-foreground-300'
	)}
>
	<Chart {options} class="py-6" />
</div>
