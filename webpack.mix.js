const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/*JS*/
mix.scripts([
        'node_modules/@fortawesome/fontawesome-free/js/all.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-animate-scroll/dist/jquery.animate-scroll.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/lazysizes/lazysizes.js',
    ], 'public/js/app.js');

mix.scripts([
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
    ], 'public/js/home.js');

mix.scripts([
        'node_modules/apexcharts/dist/apexcharts.js',
    ], 'public/js/chart.js');

/*CSS*/
mix.styles([
    'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
], 'public/css/home.css')

    .sass('resources/sass/app.scss', 'public/css');

