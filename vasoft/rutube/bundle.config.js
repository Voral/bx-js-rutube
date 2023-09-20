// noinspection JSUnresolvedVariable
const isProd = process.argv.includes('--prod');
module.exports = {
    input: './src/application.js',
    output: './dist/vasoft-rutube.bundle.js',
    namespace: 'BX.Vasoft',
    browserslist: true,
    minification: isProd,
};