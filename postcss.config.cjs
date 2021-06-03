const cssnano = require('cssnano')({ preset: 'default' });
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV === 'production';

module.exports = {
	plugins: production
		? [tailwindcss, autoprefixer, cssnano]
		: [tailwindcss]
};
