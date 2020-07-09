<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class ModuloController extends Controller{

    private $obj;
    private $page;

    public function __construct(){
        $this->obj = new \App\Modulo();
        $this->page = 'page';
    }

    public function details(){

        $rota = Route::getCurrentRoute()->uri();

        $modulo = $this->obj->where('slug', $rota)->first();
        $subMenus = $this->obj
            ->select('id', 'titulo', 'slug')
            ->where('tipo_id', $modulo->tipo_id)
            ->where('status', 1)
            ->orderBy('id')
            ->get();

        return view($this->page.'.basic', [
            'page' => $modulo,
            'subMenus' => $subMenus
        ]);

    }
}
