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
Route::get('artigos/', 'ArtigoController@listar');
Route::get('artigo/', 'ArtigoController@detalhar');//Teste deletar
/*Route::get('artigo/{id}', 'ArtigoController@detalhar');
Route::get('artigo/{id}/{titulo}', 'ArtigoController@detalhar');*/
