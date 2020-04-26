<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OscController extends Controller{

    private $obj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\Osc();
        $this->module = 'osc';
        $this->table = 'oscs';
    }

    public function edit(){

        return view($this->module.'.edit');

    }

    public function details($id){

        //$id = 394905;
        //$id = 594485;
        $id = 598897;
        //$id = 1064708;
        //$id = 2;


        $dados_gerais = DB::connection('map')->table('portal.vw_osc_dados_gerais')->where('id_osc', $id)->first();
        $area_atuacao = DB::connection('map')->table('portal.vw_osc_area_atuacao')->where('id_osc', $id)->first();
        $descricao = DB::connection('map')->table('portal.vw_osc_descricao')->where('id_osc', $id)->first();
        $relacoes_trabalho_governanca = DB::connection('map')->table('portal.vw_osc_relacoes_trabalho')->where('id_osc', $id)->first();


        return view($this->module.'.detail', [
            'id_osc' => $id,
            'dados_gerais' => $dados_gerais,
            'area_atuacao' => $area_atuacao,
            'descricao' => $descricao,
            'relacoes_trabalho_governanca' => $relacoes_trabalho_governanca,
        ]);
    }

    public function getOsc($territory, $territory_id = null){

        $urlsApi = [
            1 => "https://mapaosc.ipea.gov.br/api/geo/cluster/regiao",
            2 => "https://mapaosc.ipea.gov.br/api/geo/cluster/estado/".$territory_id,
        ];

        /*"https://mapaosc.ipea.gov.br/api/search/all/lista/10/0"
        "https://mapaosc.ipea.gov.br/api/analises/idhgeo"*/

        $pagina = $urlsApi[$territory];

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data);
       // $data = \GuzzleHttp\json_decode($data);

        $idh = [];

        $data = [
            "territorio" => $data,
            "idh" => $idh,
            "tipo_territorio" => $territory+1
        ];

        return $data;

    }
}
