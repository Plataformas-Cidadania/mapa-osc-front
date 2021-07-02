<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class MapController extends Controller{

    private $obj;
    private $table;


    public function __construct(){
        $this->obj = new \App\Map();
        $this->table = 'maps';

    }

    public function details($origem=0){
        return view('map.detail', ['origem' => $origem]);
    }

    public function buscaAvancada(Request $request){
        return view('map.detail', ['origem' => 'busca-avancada', 'json' => $request->json]);
    }
}
