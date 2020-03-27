<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class PageController extends Controller{

    private $obj;
    private $module;
    private $table;


    public function __construct(){
        $this->obj = new \App\PubPage();
        $this->lngObj = new \App\LngPubPage();
        $this->module = 'page';
        $this->table = 'pages';

    }

    public function details(){


        $rota = Route::getCurrentRoute()->uri();

        //return $rota;

        /*$detail = $this->obj
            ->select('authors.*')
            ->join('author_artigo', 'authors.id', '=', 'author_artigo.author_id')
            ->join('artigos', 'artigos.id', '=', 'author_artigo.artigo_id')
            ->where('slug', $rota)
            ->where('status', 1)
            ->first();*/


        //$detail = $this->obj->where('slug', $rota)->first()->lngPubPage()->first();
        $detail = $this->lngObj->where('slug', $rota)->first()->pubPage()->first();
        //return $detail."--";

        return $detail;

        //$menus = $this->obj->orderBy('id', 'desc')->where('type', $detail->type)->get();


        return view($this->module.'.basic', ['detail' => $detail, /*'menus' => $menus*/]);

    }
}
