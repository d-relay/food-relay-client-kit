import { defineConfig } from 'windicss/helpers'

import ratio from 'windicss/plugin/aspect-ratio'
import forms from 'windicss/plugin/forms'
import clamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'
import filters from 'windicss/plugin/filters'
import snap from 'windicss/plugin/scroll-snap'

export default defineConfig({
	extract: {
		include: ['src/**/*.{html,svelte}'],
	},
	theme: {
		extend: {
			boxShadow: {
				main: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'
			},
		}
	},
	plugins: [ratio, forms, clamp, typography, filters, snap,]
})

// module.exports = {
// 	// mode: 'jit',
// 	purge: {
// 		content: [
// 			"./src/**/*.html",
// 			"./src/**/*.svelte"
// 		],
// 		options: {
// 			keyframes: true,
// 		},
// 	},
// 	darkMode: false, // or 'media' or 'class'
// 	theme: {
// 		extend: {
// 			colors: {
// 				current: "currentColor",
// 				transparent: "transparent",
// 				white: "#fff",
// 				black: "#000",
// 				teal: {
// 					50: "#edfafa",
// 					100: "#d5f5f6",
// 					200: "#afecef",
// 					300: "#7edce2",
// 					400: "#16bdca",
// 					500: "#0694a2",
// 					600: "#047481",
// 					700: "#036672",
// 					800: "#05505c",
// 					900: "#014451",
// 				},
// 			},
// 			boxShadow: {
// 				teal: '0 4px 14px 0 rgba(126, 220, 226, 0.45)',
// 				main: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'
// 			},
// 		},
// 	},
// 	variants: {
// 		extend: {},
// 	},
// 	plugins: [
// 		require('@tailwindcss/forms'),
// 		require('@tailwindcss/typography'),
// 		require('@tailwindcss/aspect-ratio'),
// 	],
// }