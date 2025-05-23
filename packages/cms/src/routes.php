<?php



Route::group(['middleware' => 'cms'], function () {

    Route::get('/cms/login', 'Cms\Controllers\HomeController@telaLogin');
    Route::get('/cms/logout', 'Cms\Controllers\HomeController@logout');
    Route::post('/cms/login', 'Cms\Controllers\HomeController@login');

    Route::group(['middleware' => 'authcms:cms'], function () {

        Route::get('/cms', 'Cms\Controllers\HomeController@index');

        //Setting
        Route::get('/cms/setting/', 'Cms\Controllers\SettingController@detalhar');
        Route::post('/cms/alterar-setting/{id}', 'Cms\Controllers\SettingController@alterar');

        //WEBDOORS
        Route::get('/cms/webdoors', 'Cms\Controllers\WebdoorController@index');
        Route::get('/cms/listar-webdoors', 'Cms\Controllers\WebdoorController@listar');
        Route::post('/cms/inserir-webdoor', 'Cms\Controllers\WebdoorController@inserir');
        Route::get('/cms/webdoor/{id}', 'Cms\Controllers\WebdoorController@detalhar');
        Route::post('/cms/alterar-webdoor/{id}', 'Cms\Controllers\WebdoorController@alterar');
        Route::get('/cms/excluir-webdoor/{id}', 'Cms\Controllers\WebdoorController@excluir');
        Route::get('/cms/status-webdoor/{id}', 'Cms\Controllers\WebdoorController@status');
        Route::get('/cms/positionUp-webdoor/{id}', 'Cms\Controllers\WebdoorController@positionUp');
        Route::get('/cms/positionDown-webdoor/{id}', 'Cms\Controllers\WebdoorController@positionDown');

        //ITEMS
        Route::get('/cms/items/{modulo_id}', 'Cms\Controllers\ItemController@index');
        Route::get('/cms/listar-items', 'Cms\Controllers\ItemController@listar');
        Route::post('/cms/inserir-item', 'Cms\Controllers\ItemController@inserir');
        Route::get('/cms/item/{id}', 'Cms\Controllers\ItemController@detalhar');
        Route::post('/cms/alterar-item/{id}', 'Cms\Controllers\ItemController@alterar');
        Route::get('/cms/excluir-item/{id}', 'Cms\Controllers\ItemController@excluir');
        Route::get('/cms/status-item/{id}', 'Cms\Controllers\ItemController@status');
        Route::get('/cms/positionUp-item/{id}', 'Cms\Controllers\ItemController@positionUp');
        Route::get('/cms/positionDown-item/{id}', 'Cms\Controllers\ItemController@positionDown');

        //SUBITEMS
        Route::get('/cms/subitems/{modulo_id}', 'Cms\Controllers\SubitemController@index');
        Route::get('/cms/listar-subitems', 'Cms\Controllers\SubitemController@listar');
        Route::post('/cms/inserir-subitem', 'Cms\Controllers\SubitemController@inserir');
        Route::get('/cms/subitem/{id}', 'Cms\Controllers\SubitemController@detalhar');
        Route::post('/cms/alterar-subitem/{id}', 'Cms\Controllers\SubitemController@alterar');
        Route::get('/cms/excluir-subitem/{id}', 'Cms\Controllers\SubitemController@excluir');
        Route::get('/cms/status-subitem/{id}', 'Cms\Controllers\SubitemController@status');
        Route::get('/cms/positionUp-subitem/{id}', 'Cms\Controllers\SubitemController@positionUp');
        Route::get('/cms/positionDown-subitem/{id}', 'Cms\Controllers\SubitemController@positionDown');

        //ITEMS MROSC
        Route::get('/cms/items-mrosc/{mrosc_id}', 'Cms\Controllers\ItemMroscController@index');
        Route::get('/cms/listar-items-mrosc', 'Cms\Controllers\ItemMroscController@listar');
        Route::post('/cms/inserir-item-mrosc', 'Cms\Controllers\ItemMroscController@inserir');
        Route::get('/cms/item-mrosc/{id}', 'Cms\Controllers\ItemMroscController@detalhar');
        Route::post('/cms/alterar-item-mrosc/{id}', 'Cms\Controllers\ItemMroscController@alterar');
        Route::get('/cms/excluir-item-mrosc/{id}', 'Cms\Controllers\ItemMroscController@excluir');
        Route::get('/cms/status-item-mrosc/{id}', 'Cms\Controllers\ItemMroscController@status');

        //ITEMS VERSAO
        Route::get('/cms/items-versao/{versao_id}', 'Cms\Controllers\ItemVersaoController@index');
        Route::get('/cms/listar-items-versao', 'Cms\Controllers\ItemVersaoController@listar');
        Route::post('/cms/inserir-item-versao', 'Cms\Controllers\ItemVersaoController@inserir');
        Route::get('/cms/item-versao/{id}', 'Cms\Controllers\ItemVersaoController@detalhar');
        Route::post('/cms/alterar-item-versao/{id}', 'Cms\Controllers\ItemVersaoController@alterar');
        Route::get('/cms/excluir-item-versao/{id}', 'Cms\Controllers\ItemVersaoController@excluir');
        Route::get('/cms/status-item-versao/{id}', 'Cms\Controllers\ItemVersaoController@status');


        //Route::get('/cms/teste-excel', 'Cms\Controllers\SerieController@testeExcel');
        Route::get('/cms/teste-excel/{id}/{arquivo}', 'Cms\Controllers\SerieController@testeExcel');

        //MODULOS
        Route::get('/cms/modulos', 'Cms\Controllers\ModuloController@index');
        Route::get('/cms/listar-modulos', 'Cms\Controllers\ModuloController@listar');
        Route::post('/cms/inserir-modulo', 'Cms\Controllers\ModuloController@inserir');
        Route::get('/cms/modulo/{id}', 'Cms\Controllers\ModuloController@detalhar');
        Route::post('/cms/alterar-modulo/{id}', 'Cms\Controllers\ModuloController@alterar');
        Route::get('/cms/excluir-modulo/{id}', 'Cms\Controllers\ModuloController@excluir');
        Route::get('/cms/status-modulo/{id}', 'Cms\Controllers\ModuloController@status');

        //TIPOS
        Route::get('/cms/tipos', 'Cms\Controllers\TipoController@index');
        Route::get('/cms/listar-tipos', 'Cms\Controllers\TipoController@listar');
        Route::post('/cms/inserir-tipo', 'Cms\Controllers\TipoController@inserir');
        Route::get('/cms/tipo/{id}', 'Cms\Controllers\TipoController@detalhar');
        Route::post('/cms/alterar-tipo/{id}', 'Cms\Controllers\TipoController@alterar');
        Route::get('/cms/excluir-tipo/{id}', 'Cms\Controllers\TipoController@excluir');
        Route::get('/cms/status-tipo/{id}', 'Cms\Controllers\TipoController@status');

        //TIPOS GRAFICOS
        Route::get('/cms/tipos-graficos', 'Cms\Controllers\TipoGraficoController@index');
        Route::get('/cms/listar-tipos-graficos', 'Cms\Controllers\TipoGraficoController@listar');
        Route::post('/cms/inserir-tipo-grafico', 'Cms\Controllers\TipoGraficoController@inserir');
        Route::get('/cms/tipo-grafico/{id}', 'Cms\Controllers\TipoGraficoController@detalhar');
        Route::post('/cms/alterar-tipo-grafico/{id}', 'Cms\Controllers\TipoGraficoController@alterar');
        Route::get('/cms/excluir-tipo-grafico/{id}', 'Cms\Controllers\TipoGraficoController@excluir');
        Route::get('/cms/status-tipo-grafico/{id}', 'Cms\Controllers\TipoGraficoController@status');

        //NOTICIAS
        Route::get('/cms/noticias', 'Cms\Controllers\NoticiaController@index');
        Route::get('/cms/listar-noticias', 'Cms\Controllers\NoticiaController@listar');
        Route::post('/cms/inserir-noticia', 'Cms\Controllers\NoticiaController@inserir');
        Route::get('/cms/noticia/{id}', 'Cms\Controllers\NoticiaController@detalhar');
        Route::post('/cms/alterar-noticia/{id}', 'Cms\Controllers\NoticiaController@alterar');
        Route::get('/cms/excluir-noticia/{id}', 'Cms\Controllers\NoticiaController@excluir');
        Route::get('/cms/status-noticia/{id}', 'Cms\Controllers\NoticiaController@status');


        //MIDIAS
        Route::get('/cms/midias', 'Cms\Controllers\MidiaController@index');
        Route::get('/cms/listar-midias', 'Cms\Controllers\MidiaController@listar');
        Route::post('/cms/inserir-midia', 'Cms\Controllers\MidiaController@inserir');
        Route::get('/cms/midia/{id}', 'Cms\Controllers\MidiaController@detalhar');
        Route::post('/cms/alterar-midia/{id}', 'Cms\Controllers\MidiaController@alterar');
        Route::get('/cms/excluir-midia/{id}', 'Cms\Controllers\MidiaController@excluir');
        Route::get('/cms/status-midia/{id}', 'Cms\Controllers\MidiaController@status');

        //CATEGORIAS
        Route::get('/cms/categorias', 'Cms\Controllers\CategoriaController@index');
        Route::get('/cms/categorias/{midia_id}', 'Cms\Controllers\CategoriaController@index');
        Route::get('/cms/listar-categorias', 'Cms\Controllers\CategoriaController@listar');
        Route::post('/cms/inserir-categoria', 'Cms\Controllers\CategoriaController@inserir');
        Route::get('/cms/categoria/{id}', 'Cms\Controllers\CategoriaController@detalhar');
        Route::post('/cms/alterar-categoria/{id}', 'Cms\Controllers\CategoriaController@alterar');
        Route::get('/cms/excluir-categoria/{id}', 'Cms\Controllers\CategoriaController@excluir');

        //CHARTS
        Route::get('/cms/charts', 'Cms\Controllers\ChartController@index');
        Route::get('/cms/charts/{chart_categoria_id}', 'Cms\Controllers\ChartController@index');
        Route::get('/cms/listar-charts', 'Cms\Controllers\ChartController@listar');
        Route::post('/cms/inserir-chart', 'Cms\Controllers\ChartController@inserir');
        Route::get('/cms/chart/{id}', 'Cms\Controllers\ChartController@detalhar');
        Route::post('/cms/alterar-chart/{id}', 'Cms\Controllers\ChartController@alterar');
        Route::get('/cms/excluir-chart/{id}', 'Cms\Controllers\ChartController@excluir');
        Route::get('/cms/status-chart/{id}', 'Cms\Controllers\ChartController@status');

        //POSTS
        Route::get('/cms/posts', 'Cms\Controllers\PostController@index');
        Route::get('/cms/posts/{categoria_id}', 'Cms\Controllers\PostController@index');
        Route::get('/cms/listar-posts', 'Cms\Controllers\PostController@listar');
        Route::post('/cms/inserir-post', 'Cms\Controllers\PostController@inserir');
        Route::get('/cms/post/{id}', 'Cms\Controllers\PostController@detalhar');
        Route::post('/cms/alterar-post/{id}', 'Cms\Controllers\PostController@alterar');
        Route::get('/cms/excluir-post/{id}', 'Cms\Controllers\PostController@excluir');
        Route::get('/cms/status-post/{id}', 'Cms\Controllers\PostController@status');
        Route::get('/cms/destaque-post/{id}', 'Cms\Controllers\PostController@destaque');

        //PUBLICATIONS
        Route::get('/cms/publications', 'Cms\Controllers\PublicationController@index');
        Route::get('/cms/listar-publications', 'Cms\Controllers\PublicationController@listar');
        Route::post('/cms/inserir-publication', 'Cms\Controllers\PublicationController@inserir');
        Route::get('/cms/publication/{id}', 'Cms\Controllers\PublicationController@detalhar');
        Route::post('/cms/alterar-publication/{id}', 'Cms\Controllers\PublicationController@alterar');
        Route::get('/cms/excluir-publication/{id}', 'Cms\Controllers\PublicationController@excluir');
        Route::get('/cms/status-publication/{id}', 'Cms\Controllers\PublicationController@status');

        //LINKS
        Route::get('/cms/links', 'Cms\Controllers\LinkController@index');
        Route::get('/cms/listar-links', 'Cms\Controllers\LinkController@listar');
        Route::post('/cms/inserir-link', 'Cms\Controllers\LinkController@inserir');
        Route::get('/cms/link/{id}', 'Cms\Controllers\LinkController@detalhar');
        Route::post('/cms/alterar-link/{id}', 'Cms\Controllers\LinkController@alterar');
        Route::get('/cms/excluir-link/{id}', 'Cms\Controllers\LinkController@excluir');
        Route::get('/cms/status-link/{id}', 'Cms\Controllers\LinkController@status');
        Route::get('/cms/positionUp-link/{id}', 'Cms\Controllers\LinkController@positionUp');
        Route::get('/cms/positionDown-link/{id}', 'Cms\Controllers\LinkController@positionDown');

        //ChartCategoria
        Route::get('/cms/chart_categorias', 'Cms\Controllers\ChartCategoriaController@index');
        Route::get('/cms/listar-chart_categorias', 'Cms\Controllers\ChartCategoriaController@listar');
        Route::post('/cms/inserir-chart_categoria', 'Cms\Controllers\ChartCategoriaController@inserir');
        Route::get('/cms/chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@detalhar');
        Route::post('/cms/alterar-chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@alterar');
        Route::get('/cms/excluir-chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@excluir');
        Route::get('/cms/status-chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@status');
        Route::get('/cms/positionUp-chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@positionUp');
        Route::get('/cms/positionDown-chart_categoria/{id}', 'Cms\Controllers\ChartCategoriaController@positionDown');

        //APOIOS
        Route::get('/cms/apoios', 'Cms\Controllers\ApoioController@index');
        Route::get('/cms/listar-apoios', 'Cms\Controllers\ApoioController@listar');
        Route::post('/cms/inserir-apoio', 'Cms\Controllers\ApoioController@inserir');
        Route::get('/cms/apoio/{id}', 'Cms\Controllers\ApoioController@detalhar');
        Route::post('/cms/alterar-apoio/{id}', 'Cms\Controllers\ApoioController@alterar');
        Route::get('/cms/excluir-apoio/{id}', 'Cms\Controllers\ApoioController@excluir');
        Route::get('/cms/status-apoio/{id}', 'Cms\Controllers\ApoioController@status');
        Route::get('/cms/positionUp-apoio/{id}', 'Cms\Controllers\ApoioController@positionUp');
        Route::get('/cms/positionDown-apoio/{id}', 'Cms\Controllers\ApoioController@positionDown');

        //EQUIPES
        Route::get('/cms/equipes', 'Cms\Controllers\EquipeController@index');
        Route::get('/cms/listar-equipes', 'Cms\Controllers\EquipeController@listar');
        Route::post('/cms/inserir-equipe', 'Cms\Controllers\EquipeController@inserir');
        Route::get('/cms/equipe/{id}', 'Cms\Controllers\EquipeController@detalhar');
        Route::post('/cms/alterar-equipe/{id}', 'Cms\Controllers\EquipeController@alterar');
        Route::get('/cms/excluir-equipe/{id}', 'Cms\Controllers\EquipeController@excluir');

        //INTEGRANTES
        Route::get('/cms/integrantes', 'Cms\Controllers\IntegranteController@index');
        Route::get('/cms/listar-integrantes', 'Cms\Controllers\IntegranteController@listar');
        Route::post('/cms/inserir-integrante', 'Cms\Controllers\IntegranteController@inserir');
        Route::get('/cms/integrante/{id}', 'Cms\Controllers\IntegranteController@detalhar');
        Route::post('/cms/alterar-integrante/{id}', 'Cms\Controllers\IntegranteController@alterar');
        Route::get('/cms/excluir-integrante/{id}', 'Cms\Controllers\IntegranteController@excluir');

        //EDITAIS
        Route::get('/cms/editais', 'Cms\Controllers\EditalController@index');
        Route::get('/cms/listar-editais', 'Cms\Controllers\EditalController@listar');
        Route::post('/cms/inserir-edital', 'Cms\Controllers\EditalController@inserir');
        Route::get('/cms/edital/{id}', 'Cms\Controllers\EditalController@detalhar');
        Route::post('/cms/alterar-edital/{id}', 'Cms\Controllers\EditalController@alterar');
        Route::get('/cms/excluir-edital/{id}', 'Cms\Controllers\EditalController@excluir');

        //GRAFICOS
        Route::get('/cms/graficos', 'Cms\Controllers\GraficoController@index');
        Route::get('/cms/listar-graficos', 'Cms\Controllers\GraficoController@listar');
        Route::post('/cms/inserir-grafico', 'Cms\Controllers\GraficoController@inserir');
        Route::get('/cms/grafico/{id}', 'Cms\Controllers\GraficoController@detalhar');
        Route::post('/cms/alterar-grafico/{id}', 'Cms\Controllers\GraficoController@alterar');
        Route::get('/cms/excluir-grafico/{id}', 'Cms\Controllers\GraficoController@excluir');
        Route::get('/cms/status-grafico/{id}', 'Cms\Controllers\GraficoController@status');

        //MROSCS
        Route::get('/cms/mroscs', 'Cms\Controllers\MroscController@index');
        Route::get('/cms/listar-mroscs', 'Cms\Controllers\MroscController@listar');
        Route::post('/cms/inserir-mrosc', 'Cms\Controllers\MroscController@inserir');
        Route::get('/cms/mrosc/{id}', 'Cms\Controllers\MroscController@detalhar');
        Route::post('/cms/alterar-mrosc/{id}', 'Cms\Controllers\MroscController@alterar');
        Route::get('/cms/excluir-mrosc/{id}', 'Cms\Controllers\MroscController@excluir');
        Route::get('/cms/status-mrosc/{id}', 'Cms\Controllers\MroscController@status');
        Route::get('/cms/positionUp-mrosc/{id}', 'Cms\Controllers\MroscController@positionUp');
        Route::get('/cms/positionDown-mrosc/{id}', 'Cms\Controllers\MroscController@positionDown');

        //VERSOES
        Route::get('/cms/versoes', 'Cms\Controllers\VersaoController@index');
        Route::get('/cms/listar-versoes', 'Cms\Controllers\VersaoController@listar');
        Route::post('/cms/inserir-versao', 'Cms\Controllers\VersaoController@inserir');
        Route::get('/cms/versao/{id}', 'Cms\Controllers\VersaoController@detalhar');
        Route::post('/cms/alterar-versao/{id}', 'Cms\Controllers\VersaoController@alterar');
        Route::get('/cms/excluir-versao/{id}', 'Cms\Controllers\VersaoController@excluir');
        Route::get('/cms/status-versao/{id}', 'Cms\Controllers\VersaoController@status');
        Route::get('/cms/positionUp-versao/{id}', 'Cms\Controllers\VersaoController@positionUp');
        Route::get('/cms/positionDown-versao/{id}', 'Cms\Controllers\VersaoController@positionDown');

        //IDIOMAS
        Route::get('/cms/idiomas', 'Cms\Controllers\IdiomaController@index');
        Route::get('/cms/listar-idiomas', 'Cms\Controllers\IdiomaController@listar');
        Route::post('/cms/inserir-idioma', 'Cms\Controllers\IdiomaController@inserir');
        Route::get('/cms/idioma/{id}', 'Cms\Controllers\IdiomaController@detalhar');
        Route::post('/cms/alterar-idioma/{id}', 'Cms\Controllers\IdiomaController@alterar');
        Route::get('/cms/excluir-idioma/{id}', 'Cms\Controllers\IdiomaController@excluir');


        //VIDEOS
        Route::get('/cms/videos', 'Cms\Controllers\VideoController@index');
        Route::get('/cms/listar-videos', 'Cms\Controllers\VideoController@listar');
        Route::post('/cms/inserir-video', 'Cms\Controllers\VideoController@inserir');
        Route::get('/cms/video/{id}', 'Cms\Controllers\VideoController@detalhar');
        Route::post('/cms/alterar-video/{id}', 'Cms\Controllers\VideoController@alterar');
        Route::get('/cms/excluir-video/{id}', 'Cms\Controllers\VideoController@excluir');
        Route::get('/cms/status-video/{id}', 'Cms\Controllers\VideoController@status');


        //User
        Route::get('/cms/usuarios', 'Cms\Controllers\CmsUserController@index');
        Route::get('/cms/listar-cmsusers', 'Cms\Controllers\CmsUserController@listar');
        Route::post('/cms/inserir-cmsuser', 'Cms\Controllers\CmsUserController@inserir');
        Route::get('/cms/usuario/{id}', 'Cms\Controllers\CmsUserController@detalhar');
        Route::post('/cms/alterar-cmsuser/{id}', 'Cms\Controllers\CmsUserController@alterar');
        Route::get('/cms/perfil', 'Cms\Controllers\CmsUserController@perfil');
        Route::post('/cms/alterar-perfil', 'Cms\Controllers\CmsUserController@alterarPerfil');
        Route::get('/cms/excluir-cmsuser/{id}', 'Cms\Controllers\CmsUserController@excluir');

        //TEASERS
        Route::get('/cms/teasers', 'Cms\Controllers\TeaserController@index');
        Route::get('/cms/listar-teasers', 'Cms\Controllers\TeaserController@listar');
        Route::post('/cms/inserir-teaser', 'Cms\Controllers\TeaserController@inserir');
        Route::get('/cms/teaser/{id}', 'Cms\Controllers\TeaserController@detalhar');
        Route::post('/cms/alterar-teaser/{id}', 'Cms\Controllers\TeaserController@alterar');
        Route::get('/cms/excluir-teaser/{id}', 'Cms\Controllers\TeaserController@excluir');
        Route::get('/cms/positionUp-teaser/{id}', 'Cms\Controllers\TeaserController@positionUp');
        Route::get('/cms/positionDown-teaser/{id}', 'Cms\Controllers\TeaserController@positionDown');


        //TERMO
        Route::get('/cms/termos', 'Cms\Controllers\TermoController@index');
        Route::get('/cms/listar-termos', 'Cms\Controllers\TermoController@listar');
        Route::post('/cms/inserir-termo', 'Cms\Controllers\TermoController@inserir');
        Route::get('/cms/termo/{id}', 'Cms\Controllers\TermoController@detalhar');
        Route::post('/cms/alterar-termo/{id}', 'Cms\Controllers\TermoController@alterar');
        Route::get('/cms/excluir-termo/{id}', 'Cms\Controllers\TermoController@excluir');
        Route::get('/cms/positionUp-termo/{id}', 'Cms\Controllers\TermoController@positionUp');
        Route::get('/cms/positionDown-termo/{id}', 'Cms\Controllers\TermoController@positionDown');

        //TEXTS
        Route::get('/cms/texts', 'Cms\Controllers\TextController@index');
        Route::get('/cms/listar-texts', 'Cms\Controllers\TextController@listar');
        Route::post('/cms/inserir-text', 'Cms\Controllers\TextController@inserir');
        Route::get('/cms/text/{id}', 'Cms\Controllers\TextController@detalhar');
        Route::post('/cms/alterar-text/{id}', 'Cms\Controllers\TextController@alterar');
        Route::get('/cms/excluir-text/{id}', 'Cms\Controllers\TextController@excluir');

        //ARTWORKS
        Route::get('/cms/artworks', 'Cms\Controllers\ArtworkController@index');
        Route::get('/cms/listar-artworks', 'Cms\Controllers\ArtworkController@listar');
        Route::post('/cms/inserir-artwork', 'Cms\Controllers\ArtworkController@inserir');
        Route::get('/cms/artwork/{id}', 'Cms\Controllers\ArtworkController@detalhar');
        Route::post('/cms/alterar-artwork/{id}', 'Cms\Controllers\ArtworkController@alterar');
        Route::get('/cms/excluir-artwork/{id}', 'Cms\Controllers\ArtworkController@excluir');

        //DIRECTIVES
        Route::get('/cms/directives', 'Cms\Controllers\DirectiveController@index');
        Route::get('/cms/listar-directives', 'Cms\Controllers\DirectiveController@listar');
        Route::post('/cms/inserir-directive', 'Cms\Controllers\DirectiveController@inserir');
        Route::get('/cms/directive/{id}', 'Cms\Controllers\DirectiveController@detalhar');
        Route::post('/cms/alterar-directive/{id}', 'Cms\Controllers\DirectiveController@alterar');
        Route::get('/cms/excluir-directive/{id}', 'Cms\Controllers\DirectiveController@excluir');

        //PRINTINGS
        Route::get('/cms/printings', 'Cms\Controllers\PrintingController@index');
        Route::get('/cms/listar-printings', 'Cms\Controllers\PrintingController@listar');
        Route::post('/cms/inserir-printing', 'Cms\Controllers\PrintingController@inserir');
        Route::get('/cms/printing/{id}', 'Cms\Controllers\PrintingController@detalhar');
        Route::post('/cms/alterar-printing/{id}', 'Cms\Controllers\PrintingController@alterar');
        Route::get('/cms/excluir-printing/{id}', 'Cms\Controllers\PrintingController@excluir');

        //USUARIOS
        Route::get('/cms/usuarios-oscs', 'Cms\Controllers\UsuarioController@index');
        Route::get('/cms/listar-usuarios-oscs', 'Cms\Controllers\UsuarioController@listar');
        Route::get('/cms/status-usuario-osc/{id}', 'Cms\Controllers\UsuarioController@status');

        //POPUPS
        Route::get('/cms/popups', 'Cms\Controllers\PopupController@index');
        Route::get('/cms/listar-popups', 'Cms\Controllers\PopupController@listar');
        Route::post('/cms/inserir-popup', 'Cms\Controllers\PopupController@inserir');
        Route::get('/cms/popup/{id}', 'Cms\Controllers\PopupController@detalhar');
        Route::post('/cms/alterar-popup/{id}', 'Cms\Controllers\PopupController@alterar');
        Route::get('/cms/excluir-popup/{id}', 'Cms\Controllers\PopupController@excluir');
        Route::get('/cms/status-popup/{id}', 'Cms\Controllers\PopupController@status');
        Route::get('/cms/positionUp-popup/{id}', 'Cms\Controllers\PopupController@positionUp');
        Route::get('/cms/positionDown-popup/{id}', 'Cms\Controllers\PopupController@positionDown');
    });

});
