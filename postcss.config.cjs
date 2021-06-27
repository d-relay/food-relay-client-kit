const cssnano = require('cssnano')({ preset: 'default' });
const windicss = require('postcss-windicss');

const production = process.env.NODE_ENV === 'production';

module.exports = { plugins: production ? [windicss, cssnano] : [windicss] };

