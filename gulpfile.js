var elixir = require('laravel-elixir');
var browserSync = require('laravel-elixir-browsersync');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.sass('app.scss');
    mix.scripts([
        'vendor/jquery-2.2.2.js',
        'vendor/prism.js',
    ],
        'public/js/main.js'
    ),
    mix.scripts([
        'components/dropdown.js'
    ],
        'public/js/components.js'
    );
    // browserSync.init();
    // mix.browserSync({
    //     proxy 			: "creativdepot.dev/public",
    //     logPrefix		: "Laravel Eixir BrowserSync",
    //     logConnections	: false,
    //     reloadOnRestart : false,
    //     notify 			: false
    // });

});
