const cssnano = require('cssnano')({ preset: 'default' });
const postcssPreset = require('postcss-preset-env')({ stage: 1 })
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    plugins: production
        ? [tailwindcss, postcssPreset, autoprefixer, cssnano]
        : [tailwindcss]
};