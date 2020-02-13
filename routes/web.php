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

Route::get('/', function () {
    return view('home');
});

/*
$listRoutes = [["artigos", "Article"], "noticias", 'produtos'];
$detailsRoutes = ["artigo", "noticia", 'produto'];
$searchRoutes = ["noticias"];*/

$routes = [
    //controller, listing, details
    ['Article', 'artigos', 'artigo'],
    ['New', 'noticias', 'noticia'],
    ['Product', 'produtos', 'produto'],
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



/*foreach ($detailsRoutes as $route) {
    Route::get($route[0].'/', $route[1].'Controller@listing');
}*/
/*foreach ($listRoutes as $route) {
    Route::get($route.'/{id}/{titulo}', ucfirst($rota).'Controller@details');
}
foreach ($searchRoutes as $route) {
    Route::get($route.'/{search}', ucfirst($rota).'Controller@listing');
}*/

//ROTAS AVULSAS

/*Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('artigos/{categoria_id}', ucfirst($rota).'Controller@listar');

Route::get('produtos/{categoria_id}', ucfirst($rota).'Controller@listar');
Route::get('produtos/{categoria_id}/{subcategoria_id}', ucfirst($rota).'Controller@listar');*/


