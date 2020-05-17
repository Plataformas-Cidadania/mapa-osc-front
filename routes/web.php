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
    ['Article', 'artigos', 'artigo'],
    ['Page', 'sobres', 'sobre'],
    ['New', 'noticias', 'noticia'],
    ['Product', 'produtos', 'produto'],
    ['Video', 'videos', 'video'],
];
$routesSearch = [
    //controller, search
    ['New', 'noticias'],
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

if(env('DYNAMIC_ROUTES')=='true'){
    $pages = \Illuminate\Support\Facades\DB::table('lng_pub_pages')->select('slug')->get();

    foreach ($pages as $page) {
        if(!empty($page->slug)){
            Route::get($page->slug.'/', 'PageController@details');
        }
    }
}

Route::get('editar-osc', 'OscController@edit');

///////////////////////////////////////////////////////////////////////
/*Route::get('sobre', 'PageController@details');
Route::get('metodologia', 'PageController@details');*/

//ROTAS AVULSAS

Route::get('indicadores', 'IndicatorController@chart');
Route::get('get-indicador/', 'IndicatorController@getIndicator');


Route::get('mapa', 'MapController@details');
Route::get('contato', 'ContactController@email');

Route::post('contact', 'ContactController@send');
Route::post('comment', 'CommentController@send');

Route::post('/list-posts', 'PostController@getList');
Route::post('/categories', 'PostController@categories');
Route::post('/members', 'PostController@members');
Route::post('/archives', 'PostController@archives');

Route::get('/get-osc/{territory}', 'OscController@getOsc');
Route::get('/get-osc/{territory}/{territory_id}', 'OscController@getOsc');
Route::get('/get-data-osc/{id}', 'OscController@getDataOsc');
Route::get('/get-osc-all-ufs/', 'OscController@getOscAllUfs');

Route::get('detalhar/{id}', 'OscController@details');
Route::get('detalhar/{id}/{title}', 'OscController@details');


Route::get('minhaconta-oscs/{id}/', 'MyAccountOscController@list');


/*Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');

Route::get('produtos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('produtos/{categoria_id}/{subcategoria_id}', ucfirst($rota).'Controller@listar');*/



//LOGIN E REDEFINIÇÃO DE SENHA/////////////////////////////////////////////////////////////////////
Route::get('login/{carrinho}', 'UserLoginController@index');//pg de login vindo da seleção do carrinho
Route::get('login', 'UserLoginController@index');//pg de login rota direta
Route::post('login', 'UserLoginController@login');//autenticação de login
Route::post('forget-password', 'UserLoginController@forgetPassword');
Route::get('reset-password/{token}/{email}', 'UserLoginController@resetPassword');
Route::post('change-forget-password', 'UserLoginController@changeForgetPassword');
///////////////////////////////////////////////////////////////////////////////////////
Route::post('/register', 'RegisterUserController@index');
Route::get('/register', 'RegisterUserController@index2');
/// //AREA USER///////////////////////////////////////////////////////////////////////////////////


//views
Route::get('/dashboard-user', 'UserAreaController@index')->middleware('auth');
Route::get('/area-user', 'UserAreaController@index')->middleware('auth');
Route::get('/dados-user', 'UserAreaController@data')->middleware('auth');

Route::get('/dados-textos', 'UserAreaController@texts')->middleware('auth');
Route::get('/dados-texto/{id}', 'UserAreaController@text')->middleware('auth');

Route::get('/dados-arquivos', 'UserAreaController@documents')->middleware('auth');
Route::get('/dados-arquivo/{id}', 'UserAreaController@document')->middleware('auth');


Route::get('/videos-privados', 'UserAreaController@videos')->middleware('auth');

Route::get('/logout-user', 'UserLoginController@logout');


//ajax
Route::post('/list-users-documents', 'UserAreaController@listDocuments')->middleware('auth');
Route::get('/detalhar-users-document/{id}', 'UserAreaController@detailDocument')->middleware('auth');

Route::post('/list-users-texts', 'UserAreaController@listTexts')->middleware('auth');
Route::get('/detalhar-users-text/{id}', 'UserAreaController@detailText')->middleware('auth');

Route::post('/update-data', 'UserAreaController@updateData')->middleware('auth');
Route::get('/get-data', 'UserAreaController@getData')->middleware('auth');

Route::get('/list-private-videos', 'PrivateVideoController@listing')->middleware('auth');
Route::get('/private-video/{id}', 'PrivateVideoController@video')->middleware('auth');

//chamado no iframe dentro do componente video
Route::get('/streaming-credentials/{type}/{video}/{id}', 'PrivateVideoController@streamingCredentials');

Route::get('/completed-videos/{id}', 'PrivateVideoController@completedVideo');



///////////////////////////////////////////////////////////////////////////////////////////////////


