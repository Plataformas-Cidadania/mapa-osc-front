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
        $detail = $this->obj->find($id);
        $lasts = $this->obj->orderBy('id', 'desc')->take(4)->get();
        return view($this->module.'.detail', ['detail' => $detail, 'lasts' => $lasts]);
    }

    public function getOsc(){

        $pagina = "https://mapaosc.ipea.gov.br/api/geo/cluster/regiao";

        /*https://mapaosc.ipea.gov.br/api/geo/cluster/regiao
        https://mapaosc.ipea.gov.br/api/geo/cluster/estado
        https://mapaosc.ipea.gov.br/api/analises/idhgeo
        https://mapaosc.ipea.gov.br/api/search/all/lista/10/0*/

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data);
       // $data = \GuzzleHttp\json_decode($data);

        return $data;

    }
}
