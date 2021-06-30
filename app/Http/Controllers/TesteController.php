<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class TesteController extends Controller{

    public function geoRegioes(){
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/geo/regioes";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data, true);

        return $data;
    }

    public function geoEstadosRegiao($regiao_id){
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/geo/estados/regiao/$regiao_id";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data, true);

        return $data;
    }

    public function listaOsc($pagina){
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/lista_osc/$pagina";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data, true);

        return $data;
    }

    public function buscaOscGeo($avancado){

        $avancado = urlencode($avancado);
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/busca_avancada/geo/10/0?avancado=$avancado";
        //Log::info($pagina);

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }

    public function buscaOscLista($avancado){

        $avancado = urlencode($avancado);
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/busca_avancada/lista/10/0?avancado=$avancado";
        //Log::info($pagina);

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }

}
