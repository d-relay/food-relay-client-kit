const sveltePreprocess = require('svelte-preprocess');
const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');
const dotenv = require('dotenv');
const precompileIntl = require("svelte-intl-precompile/sveltekit-plugin");
dotenv.config();

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
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
				noExternal: Object.keys(pkg.dependencies || {}),
			},
			plugins: [
				precompileIntl('locales') // if your translations are defined in /locales/[lang].js
			]
		}
	}
};
