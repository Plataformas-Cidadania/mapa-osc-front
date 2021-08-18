<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController@index');
Route::get('get-home-chart/', 'HomeController@getChartHome');


$routes = [
    //controller, listing, details
    //['Article', 'artigos', 'artigo'],
    ['Page', 'sobres', 'sobre'],
    //['New', 'noticias', 'noticia'],
    //['Product', 'produtos', 'produto'],
    ['Video', 'videos', 'video'],
];
$routesSearch = [
    //controller, search
    //['New', 'noticias'],
];

//ROTAS PADRÕES
foreach ($routes as $route) {
    Route::get($route[1].'/', $route[0].'Controller@listing');
    Route::get($route[2].'/{id}/{titulo}', $route[0].'Controller@details');
}
foreach ($routesSearch as $route) {
    Route::get($route[1].'/{search}', $route[0].'Controller@listing');
}
///////////////////////////////////////////////////////////////////////
//Route::get('sobre', 'PageController@details');

#if(env('DYNAMIC_ROUTES')=='true'){
    /*$modulos = \Illuminate\Support\Facades\DB::table('modulos')->select('slug')->get();

    foreach ($modulos as $modulo) {
        if(!empty($modulo->slug)){
            Route::get($modulo->slug.'/', 'ModuloController@details');
        }
    }*/
#}

Route::get('editar-osc', 'OscController@edit');

///////////////////////////////////////////////////////////////////////
/*Route::get('sobre', 'PageController@details');
Route::get('metodologia', 'PageController@details');*/

//ROTAS AVULSAS




Route::get('indicadores', 'IndicatorController@chart');
Route::get('get-indicador/', 'IndicatorController@getIndicator');


Route::get('mapa', 'MapController@details');
Route::get('mapa/{origem}', 'MapController@details');
Route::post('mapa-busca-avancada', 'MapController@buscaAvancada');
Route::get('mapa-busca-avancada', 'MapController@buscaAvancada');
Route::get('contato', 'ContactController@email');
Route::get('filtro', 'FilterController@search');
Route::get('localidade/{id}', 'LocalidadeController@localidade');

Route::get('pagina/depen', 'PageController@depen');

Route::post('contact', 'ContactController@send');
Route::post('comment', 'CommentController@send');

Route::get('posts/{midia}', 'PostController@post');
Route::get('posts/{midia_id}/{midia}', 'PostController@post');
Route::get('post/{id}/{titulo}', 'PostController@details');

Route::post('/list-posts', 'PostController@getList');
Route::post('/categories', 'PostController@categories');
Route::post('/members', 'PostController@members');
Route::post('/archives', 'PostController@archives');

Route::get('/get-osc/{territory}', 'OscController@getOsc');
Route::get('/get-osc/{territory}/{territory_id}', 'OscController@getOsc');
Route::get('/get-osc-uf/{estado_id}', 'OscController@getOscsUf');//TESTANDO ROTA NO BACK PARA SUBISTITUIR O /get-osc/{territory}/{territory_id}
Route::get('/get-data-osc/{id}', 'OscController@getDataOsc');
Route::get('/get-osc-all-ufs/', 'OscController@getOscAllUfs');
Route::get('/get-all-oscs/', 'OscController@getAllOscs');
Route::get('/get-idhm/{cod_uf}', 'OscController@getIDHM');
Route::get('/search/osc/geo/{osc}', 'OscController@getGeoOscSearch');
Route::post('/osc/busca_avancada/geo', 'OscController@buscaAvancadaOscGeo');
Route::post('/osc/busca_avancada/lista', 'OscController@buscaAvancadaOscLista');
Route::post('/osc/exportar', 'OscController@exportarAvancadaOsc');

//testando rota direta
Route::get('/geo/regioes', 'TesteController@geoRegioes');
Route::get('/geo/estados/regiao/{regiao_id}', 'TesteController@geoEstadosRegiao');
Route::get('/lista_osc/{pagina}', 'TesteController@listaOsc');
Route::get('/osc/busca_avancada/geo/10/0/{avancado}', 'TesteController@buscaOscGeo');

Route::get('/osc/busca_avancada/lista/10/0/{avancado}', 'TesteController@buscaOscLista');

Route::get('/teste/osc/logo/{id_osc}', 'TesteController@testeLogo');
Route::get('/teste/json', 'TesteController@testeEstruturaJson');
Route::get('/teste/objetivos_metas', 'TesteController@objetivosMetas');
Route::get('/search/atividade_economica/autocomplete/{search}', 'TesteController@atividadeEconomica');
Route::get('/menu/osc/certificado/', 'TesteController@certificados');
Route::get('/menu/osc/status_projeto', 'TesteController@situacaoProjeto');
Route::get('/menu/osc/origem_fonte_recursos_projeto', 'TesteController@origemFonteRecursosProjeto');
Route::get('/menu/osc/zona_atuacao_projeto', 'TesteController@origemZonaAtuacaoProjeto');
Route::get('/menu/osc/abrangencia_projeto', 'TesteController@abrangenciaProjeto');
Route::get('/menu/osc/ipeadata', 'TesteController@ipeadata');
////////////////


Route::get('detalhar/{id}', 'OscController@details');
Route::get('detalhar/{id}/{title}', 'OscController@details');


Route::get('minhaconta-oscs/{id}/', 'MyAccountOscController@list');
Route::get('declaracao/{id_osc}', 'OscController@declaration');
Route::get('selo-osc-user/{id_osc}', 'OscController@seal');


Route::get('selo-osc/{osc_id}', 'ToolController@seal');


/*Route::get('qr-code-g', function () {
    \QrCode::size(500)
        ->format('png')
        ->generate('ItSolutionStuff.com', public_path('images/qrcode.png'));

    return view('qrCode');

});*/


/*Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');

Route::get('produtos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('produtos/{categoria_id}/{subcategoria_id}', ucfirst($rota).'Controller@listar');*/



//LOGIN E REDEFINIÇÃO DE SENHA/////////////////////////////////////////////////////////////////////
Route::get('login/{carrinho}', 'UserLoginController@index');//pg de login vindo da seleção do carrinho
Route::get('login', 'UserLoginController@index');//pg de login rota direta
Route::post('login', 'UserLoginController@login');//autenticação de login
//Route::post('forget-password', 'UserLoginController@forgetPassword');
//Route::get('reset-password/{token}/{email}', 'UserLoginController@resetPassword');
//Route::post('change-forget-password', 'UserLoginController@changeForgetPassword');
Route::get('/redefinir-senha/{id_usuario}/{hash}', 'UserLoginController@redefinirSenha');

///////////////////////////////////////////////////////////////////////////////////////
Route::post('/register', 'RegisterUserController@index');
Route::get('/register', 'RegisterUserController@index2');
Route::get('/register-login', 'RegisterUserController@register');
Route::get('/aviso-pendente-ativacao', 'RegisterUserController@avisoPendenteAtivacao');
Route::get('/usuario-ativado', 'RegisterUserController@usuarioAtivado');
Route::get('/ativacao-invalida', 'RegisterUserController@ativacaoInvalida');

/// //AREA USER///////////////////////////////////////////////////////////////////////////////////
//views
Route::get('/area-user', 'UserAreaController@index');//->middleware('auth');
Route::get('/dashboard-user', 'UserAreaController@index');//->middleware('auth');
Route::get('/dados-user', 'UserAreaController@data');//->middleware('auth');
Route::get('/oscs-user', 'UserAreaController@oscs');//->middleware('auth');
Route::get('/osc-user/{id}', 'UserAreaController@osc');//->middleware('auth');
Route::get('/objetivos-user', 'UserAreaController@objetivos');//->middleware('auth');
//Route::get('/selo-user', 'UserAreaController@seal');//->middleware('auth');

Route::get('/certificates-user', 'UserAreaController@certificates');//->middleware('auth');
Route::get('/projetos-user', 'UserAreaController@projetos');//->middleware('auth');
Route::get('/governancas-user', 'UserAreaController@governancas');//->middleware('auth');
Route::get('/areas-atuacao-user', 'UserAreaController@atuacoes');//->middleware('auth');
Route::get('/descricao-user', 'UserAreaController@descricao');//->middleware('auth');
Route::get('/participacoes-user', 'UserAreaController@participacoes');//->middleware('auth');
Route::get('/recursos-user', 'UserAreaController@recursos');//->middleware('auth');

Route::get('/logout-user', 'UserLoginController@logout');


Route::get('/dados-arquivos', 'UserAreaController@documents');//->middleware('auth');
Route::get('/dados-arquivo/{id}', 'UserAreaController@document');//->middleware('auth');


//ajax
Route::post('/update-data', 'UserAreaController@updateData')->middleware('auth');
Route::post('/update-descricao', 'UserAreaController@updateDescricao')->middleware('auth');
Route::get('/get-data', 'UserAreaController@getData')->middleware('auth');
Route::get('/get-osc', 'UserAreaController@getOsc')->middleware('auth');
//Route::post('/list-users-oscs', 'UserAreaController@listOscs')->middleware('auth');
Route::post('/list-users-oscs', 'UserAreaController@listOscs');
Route::post('/save-logo-osc', 'UserAreaController@saveLogoOsc')->middleware('auth');
Route::post('/get-logo-osc', 'UserAreaController@getLogoOsc')->middleware('auth');


Route::post('/update-osc', 'UserAreaController@updateOsc')->middleware('auth');
//Route::get('/get-osc', 'UserAreaController@getOsc')->middleware('auth');

Route::post('/list-users-certificates', 'UserAreaController@listCertificates')->middleware('auth');
Route::get('/remove-user-certificate/{id}', 'UserAreaController@removeCertificate')->middleware('auth');
Route::get('/edit-user-certificate/{id}', 'UserAreaController@editCertificate')->middleware('auth');

Route::post('/list-users-governancas', 'UserAreaController@listGovernancas')->middleware('auth');
Route::get('/remove-user-governanca/{id}', 'UserAreaController@removeGovernanca')->middleware('auth');
Route::get('/edit-user-governanca/{id}', 'UserAreaController@editGovernanca')->middleware('auth');

Route::post('/list-users-conselhos', 'UserAreaController@listConselhos')->middleware('auth');
/*
Route::get('/detail-user-osc/{id}', 'UserAreaController@detailOsc')->middleware('auth');*/

Route::post('/list-users-documents', 'UserAreaController@listDocuments')->middleware('auth');
Route::get('/detalhar-users-document/{id}', 'UserAreaController@detailDocument')->middleware('auth');



///////////////////////////////////////////////////////////////////////////////////////////////////
Route::get('/get-descricao', 'UserAreaController@getDescricao')->middleware('auth');


