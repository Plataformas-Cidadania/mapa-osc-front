<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NoticiaController extends Controller{

    public function listar(){


        $noticias = DB::table('cmsosc.noticias')->orderBy('id', 'desc')->paginate(10);

        return view('artigo.listar', ['noticias' => $noticias]);

    }
    public function detalhar($id){

        $noticia = new \App\Noticia;
        $noticia = $noticia->find($id);


        return view('artigo.detalhar', ['noticia' => $noticia]);

    }
}
