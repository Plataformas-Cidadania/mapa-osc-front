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
    'node_modules/jquery-smoove/dist/jquery.smoove.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/lazysizes/lazysizes.js',
    'node_modules/pace-js/pace.min.js',
    'resources/js/utils.js',
    ], 'public/js/app.js');

mix.scripts([
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
    ], 'public/js/home.js');

mix.scripts([
    'node_modules/prop-types/prop-types.js',
    'node_modules/react-apexcharts/dist/react-apexcharts.js',
    'node_modules/react-apexcharts/dist/react-apexcharts.iife.min.js',
    ], 'public/js/chart.js');

mix.scripts([
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/leaflet.markercluster/dist/leaflet.markercluster.js',
        'node_modules/leaflet.fullscreen/Control.FullScreen.js',
        'node_modules/leaflet.heat/dist/leaflet-heat.js',
    ], 'public/js/leaflet.js');

/*CSS*/
mix.styles([
    'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
], 'public/css/home.css');

mix.styles([
    'node_modules/leaflet/dist/leaflet.css',
    'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
    'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
    'node_modules/leaflet.fullscreen/Control.FullScreen.css',
], 'public/css/leaflet.css')

    .sass('resources/sass/app.scss', 'public/css');

//CMS///////////////////////////////////////////////////////////////////
//css npm install less-loader less --save-dev --production=false
mix.less('packages/cms/resources/assets/less/cms.less', 'public/assets-cms/css/cms.css');
mix.styles('packages/cms/resources/assets/css/sb-admin.css', 'public/assets-cms/css/sb-admin.css');
mix.styles('packages/cms/resources/assets/css/circle.css', 'public/assets-cms/css/circle.css');

//App angular
mix.scripts('packages/cms/resources/assets/js/cms.js', 'public/assets-cms/js/cms.js');

mix.scripts('packages/cms/resources/assets/js/tiny.js', 'public/assets-cms/js/tiny.js');

mix.scripts('packages/cms/resources/assets/js/utils.js', 'public/assets-cms/js/utils.js');

//Directives
mix.scripts('packages/cms/resources/assets/js/directives/initModel.js', 'public/assets-cms/js/directives/initModel.js');

//Controllers

//Webdoor
mix.scripts('packages/cms/resources/assets/js/controllers/webdoorCtrl.js', 'public/assets-cms/js/controllers/webdoorCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarWebdoorCtrl.js', 'public/assets-cms/js/controllers/alterarWebdoorCtrl.js');

//Videos
mix.scripts('packages/cms/resources/assets/js/controllers/videoCtrl.js', 'public/assets-cms/js/controllers/videoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarVideoCtrl.js', 'public/assets-cms/js/controllers/alterarVideoCtrl.js');

//Idiomas
mix.scripts('packages/cms/resources/assets/js/controllers/idiomaCtrl.js', 'public/assets-cms/js/controllers/idiomaCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarIdiomaCtrl.js', 'public/assets-cms/js/controllers/alterarIdiomaCtrl.js');

/*//Authors
mix.scripts('packages/cms/resources/assets/js/controllers/authorCtrl.js', 'public/assets-cms/js/controllers/authorCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarAuthorCtrl.js', 'public/assets-cms/js/controllers/alterarAuthorCtrl.js');*/

//Modulos
mix.scripts('packages/cms/resources/assets/js/controllers/moduloCtrl.js', 'public/assets-cms/js/controllers/moduloCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarModuloCtrl.js', 'public/assets-cms/js/controllers/alterarModuloCtrl.js');

//Tipos
mix.scripts('packages/cms/resources/assets/js/controllers/tipoCtrl.js', 'public/assets-cms/js/controllers/tipoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarTipoCtrl.js', 'public/assets-cms/js/controllers/alterarTipoCtrl.js');

//Tipos Graficos
mix.scripts('packages/cms/resources/assets/js/controllers/tipoGraficoCtrl.js', 'public/assets-cms/js/controllers/tipoGraficoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarTipoGraficoCtrl.js', 'public/assets-cms/js/controllers/alterarTipoGraficoCtrl.js');

//Noticias
mix.scripts('packages/cms/resources/assets/js/controllers/noticiaCtrl.js', 'public/assets-cms/js/controllers/noticiaCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarNoticiaCtrl.js', 'public/assets-cms/js/controllers/alterarNoticiaCtrl.js');


//Midias
mix.scripts('packages/cms/resources/assets/js/controllers/midiaCtrl.js', 'public/assets-cms/js/controllers/midiaCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarMidiaCtrl.js', 'public/assets-cms/js/controllers/alterarMidiaCtrl.js');

//Categorias
mix.scripts('packages/cms/resources/assets/js/controllers/categoriaCtrl.js', 'public/assets-cms/js/controllers/categoriaCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarCategoriaCtrl.js', 'public/assets-cms/js/controllers/alterarCategoriaCtrl.js');

//Charts
mix.scripts('packages/cms/resources/assets/js/controllers/chartCtrl.js', 'public/assets-cms/js/controllers/chartCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarChartCtrl.js', 'public/assets-cms/js/controllers/alterarChartCtrl.js');

//Posts
mix.scripts('packages/cms/resources/assets/js/controllers/postCtrl.js', 'public/assets-cms/js/controllers/postCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarPostCtrl.js', 'public/assets-cms/js/controllers/alterarPostCtrl.js');

//Publications
mix.scripts('packages/cms/resources/assets/js/controllers/publicationCtrl.js', 'public/assets-cms/js/controllers/publicationCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarPublicationCtrl.js', 'public/assets-cms/js/controllers/alterarPublicationCtrl.js');

//Links
mix.scripts('packages/cms/resources/assets/js/controllers/linkCtrl.js', 'public/assets-cms/js/controllers/linkCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarLinkCtrl.js', 'public/assets-cms/js/controllers/alterarLinkCtrl.js');

//ChartCategorias
mix.scripts('packages/cms/resources/assets/js/controllers/chartCategoriaCtrl.js', 'public/assets-cms/js/controllers/chartCategoriaCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarChartCategoriaCtrl.js', 'public/assets-cms/js/controllers/alterarChartCategoriaCtrl.js');

//Apoios
mix.scripts('packages/cms/resources/assets/js/controllers/apoioCtrl.js', 'public/assets-cms/js/controllers/apoioCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarApoioCtrl.js', 'public/assets-cms/js/controllers/alterarApoioCtrl.js');

//Equipes
mix.scripts('packages/cms/resources/assets/js/controllers/equipeCtrl.js', 'public/assets-cms/js/controllers/equipeCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarEquipeCtrl.js', 'public/assets-cms/js/controllers/alterarEquipeCtrl.js');

//Integrantes
mix.scripts('packages/cms/resources/assets/js/controllers/integranteCtrl.js', 'public/assets-cms/js/controllers/integranteCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarIntegranteCtrl.js', 'public/assets-cms/js/controllers/alterarIntegranteCtrl.js');

//Editais
mix.scripts('packages/cms/resources/assets/js/controllers/editalCtrl.js', 'public/assets-cms/js/controllers/editalCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarEditalCtrl.js', 'public/assets-cms/js/controllers/alterarEditalCtrl.js');

//Graficos
mix.scripts('packages/cms/resources/assets/js/controllers/graficoCtrl.js', 'public/assets-cms/js/controllers/graficoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarGraficoCtrl.js', 'public/assets-cms/js/controllers/alterarGraficoCtrl.js');

//Items Modulos
mix.scripts('packages/cms/resources/assets/js/controllers/itemCtrl.js', 'public/assets-cms/js/controllers/itemCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarItemCtrl.js', 'public/assets-cms/js/controllers/alterarItemCtrl.js');

//Subitems Modulos
mix.scripts('packages/cms/resources/assets/js/controllers/subitemCtrl.js', 'public/assets-cms/js/controllers/subitemCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarSubitemCtrl.js', 'public/assets-cms/js/controllers/alterarSubitemCtrl.js');

//Mroscs
mix.scripts('packages/cms/resources/assets/js/controllers/mroscCtrl.js', 'public/assets-cms/js/controllers/mroscCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarMroscCtrl.js', 'public/assets-cms/js/controllers/alterarMroscCtrl.js');

//Items Mrosc
mix.scripts('packages/cms/resources/assets/js/controllers/itemMroscCtrl.js', 'public/assets-cms/js/controllers/itemMroscCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarItemMroscCtrl.js', 'public/assets-cms/js/controllers/alterarItemMroscCtrl.js');


//Versoes
mix.scripts('packages/cms/resources/assets/js/controllers/versaoCtrl.js', 'public/assets-cms/js/controllers/versaoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarVersaoCtrl.js', 'public/assets-cms/js/controllers/alterarVersaoCtrl.js');

//Items Versao
mix.scripts('packages/cms/resources/assets/js/controllers/itemVersaoCtrl.js', 'public/assets-cms/js/controllers/itemVersaoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarItemVersaoCtrl.js', 'public/assets-cms/js/controllers/alterarItemVersaoCtrl.js');

//CmsUsers
mix.scripts('packages/cms/resources/assets/js/controllers/cmsUserCtrl.js', 'public/assets-cms/js/controllers/cmsUserCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarCmsUserCtrl.js', 'public/assets-cms/js/controllers/alterarCmsUserCtrl.js');

//Teaser
mix.scripts('packages/cms/resources/assets/js/controllers/teaserCtrl.js', 'public/assets-cms/js/controllers/teaserCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarTeaserCtrl.js', 'public/assets-cms/js/controllers/alterarTeaserCtrl.js');

//Termo
mix.scripts('packages/cms/resources/assets/js/controllers/termoCtrl.js', 'public/assets-cms/js/controllers/termoCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarTermoCtrl.js', 'public/assets-cms/js/controllers/alterarTermoCtrl.js');

//Text
mix.scripts('packages/cms/resources/assets/js/controllers/textCtrl.js', 'public/assets-cms/js/controllers/textCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarTextCtrl.js', 'public/assets-cms/js/controllers/alterarTextCtrl.js');

//Artworks
mix.scripts('packages/cms/resources/assets/js/controllers/artworkCtrl.js', 'public/assets-cms/js/controllers/artworkCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarArtworkCtrl.js', 'public/assets-cms/js/controllers/alterarArtworkCtrl.js');

//Directives
mix.scripts('packages/cms/resources/assets/js/controllers/directiveCtrl.js', 'public/assets-cms/js/controllers/directiveCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarDirectiveCtrl.js', 'public/assets-cms/js/controllers/alterarDirectiveCtrl.js');

//Printings
mix.scripts('packages/cms/resources/assets/js/controllers/printingCtrl.js', 'public/assets-cms/js/controllers/printingCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarPrintingCtrl.js', 'public/assets-cms/js/controllers/alterarPrintingCtrl.js');

//Settings
mix.scripts('packages/cms/resources/assets/js/controllers/alterarSettingCtrl.js', 'public/assets-cms/js/controllers/alterarSettingCtrl.js');

//Usuário OSC
mix.scripts('packages/cms/resources/assets/js/controllers/usuarioCtrl.js', 'public/assets-cms/js/controllers/usuarioCtrl.js');

//Popups
mix.scripts('packages/cms/resources/assets/js/controllers/popupCtrl.js', 'public/assets-cms/js/controllers/popupCtrl.js');
mix.scripts('packages/cms/resources/assets/js/controllers/alterarPopupCtrl.js', 'public/assets-cms/js/controllers/alterarPopupCtrl.js');

//FIM CMS///////////////////////////////////////////////////////////////////
