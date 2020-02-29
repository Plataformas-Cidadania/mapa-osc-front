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
        $this->obj = new \App\Page();
        $this->module = 'page';
        $this->table = 'pages';

    }

    public function details(){

        $rota = Route::getCurrentRoute()->uri();

        $detail = $this->obj->where('slug', $rota)->first();
        $menus = $this->obj->orderBy('id', 'desc')->where('type', $detail->type)->get();
        return view($this->module.'.basic', ['detail' => $detail, 'menus' => $menus]);
        //return view('page.equipe.versoes', ['detail' => $detail, 'menus' => $menus]);
    }
}
