import flowbitePlugin from 'flowbite/plugin';
import plugin from 'tailwindcss/plugin';

const generateColor = (name, colors) => {
	return colors.reduce((obj, num) => ({ ...obj, [num]: `var(--${name}-${num})` }), {});
};

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	theme: {
		extend: {
			colors: {
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				},
				background: {
					default: 'var(--background-color)'
				},
				foreground: generateColor(
					'foreground',
					[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
				),
				slate: {
					50: '#f8fafc',
					100: '#f1f5f9',
					200: '#e2e8f0',
					300: '#cbd5e1',
					400: '#94a3b8',
					500: '#64748b',
					600: '#475569',
					700: '#334155',
					800: '#1e293b',
					900: '#0f172a'
				}
			}
		}
	},
	variants: {
		fontSize: ({ after }) => after(['em'])
	},
	plugins: [
		flowbitePlugin,
		plugin(function ({ addVariant }) {
			addVariant('em', ({ container }) => {
				container.walkRules((rule) => {
					rule.selector = `.em\\:${rule.selector.slice(1)}`;
					rule.walkDecls((decl) => {
						decl.value = decl.value.replace('rem', 'em');
					});
				});
			});
		})
	]
};
