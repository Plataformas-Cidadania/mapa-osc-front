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
/*Route::get('artigos/', 'ArtigoController@listar');
Route::get('artigo/', 'ArtigoController@detalhar');//Teste deletar*/


//NOTÍCIAS
Route::get('artigos/', 'NoticiaController@listar');
Route::get('artigos/{titulo}', 'NoticiaController@listar');
Route::get('artigo/{id}', 'NoticiaController@detalhar');
Route::get('artigo/{id}/{titulo}', 'NoticiaController@detalhar');
