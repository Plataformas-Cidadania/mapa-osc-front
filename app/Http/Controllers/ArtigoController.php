<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArtigoController extends Controller{

    public function listar(){

        return view('artigo.listar');

    }

    public function detalhar($id){

        return view('artigo.detalhar');

    }


}
