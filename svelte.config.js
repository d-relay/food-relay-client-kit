import sveltePreprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
// const pkg = require('./package.json');
import dotenv from 'dotenv';
import precompileIntl from "svelte-intl-precompile/sveltekit-plugin.js";

dotenv.config();
/** @type {import('@sveltejs/kit').Config} */
export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		postcss: true,
		replace: [
			['CLOUDINARY_IMAGE_URL', process.env.VITE_CLOUDINARY_IMAGE_URL],
			['CLOUDINARY_IMAGE_URL', process.env.VITE_CLOUDINARY_IMAGE_URL],
		],
	}),
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: ['svelte-intl-precompile', 'node-fetch']
			},
			plugins: [
				precompileIntl('locales') // if your translations are defined in /locales/[lang].js
			]
		}
	}
};
