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

Route::get('mapa', 'MapController@details');
Route::get('contato', 'ContactController@email');
Route::post('contact', 'ContactController@send');


/*Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');

Route::get('produtos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('produtos/{categoria_id}/{subcategoria_id}', ucfirst($rota).'Controller@listar');*/


