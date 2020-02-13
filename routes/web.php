<?php

$rotasPlural = "artigos";
$rotasSingular = "artigo";
$rotasController = "Noticia";



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
/*Route::get('artigos/', 'ArtigoController@listar');
Route::get('artigo/', 'ArtigoController@detalhar');//Teste deletar*/


//NOTÍCIAS
Route::get($rotasPlural.'/', $rotasController.'Controller@listar');
Route::get($rotasPlural.'/{titulo}', $rotasController.'Controller@listar');
Route::get($rotasSingular.'/{id}', $rotasController.'Controller@detalhar');
Route::get($rotasSingular.'/{id}/{titulo}', $rotasController.'Controller@detalhar');

