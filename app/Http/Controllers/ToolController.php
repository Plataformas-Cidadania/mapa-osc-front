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


        $dados_gerais = curlSelo('cabecalho', $id);
        $dados= curlSelo('dados_gerais', $id);


        ////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////
        $url = env('APP_API_ROUTE')."osc/indice_preenchimento/".$id;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $data = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        $data = json_decode($data, true);
        ////////////////////////////////////////////////////////

        //return $dados_gerais;

        return view('tool.seal', [
            'dados_gerais' => $dados_gerais,
            'dados' => $dados,
            'indice' => $data,
            'id_osc' => $id,
        ]);
    }


}
