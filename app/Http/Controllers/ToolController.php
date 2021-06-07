<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

class ToolController extends Controller{

    public function seal($id){

        $dados_gerais = DB::connection('map')->table('portal.vw_osc_dados_gerais')->where('id_osc', $id)->first();

        return view('tool.seal', [
            'dados_gerais' => $dados_gerais,
        ]);
    }


}
