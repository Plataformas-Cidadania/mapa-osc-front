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
        //$id = 784138;
        $id = 598897;
        //$id = 1064708;
        //$id = 2;


        $dados_gerais = DB::connection('map')->table('portal.vw_osc_dados_gerais')->where('id_osc', $id)->first();
        $area_atuacao = DB::connection('map')->table('portal.vw_osc_area_atuacao')->where('id_osc', $id)->first();
        $descricao = DB::connection('map')->table('portal.vw_osc_descricao')->where('id_osc', $id)->first();
        $relacoes_trabalho_governanca = DB::connection('map')->table('portal.vw_osc_relacoes_trabalho')->where('id_osc', $id)->first();
        $recursos = DB::connection('map')->table('portal.vw_osc_recursos_osc')->select('dt_ano_recursos_osc')->where('id_osc', $id)->distinct()->orderBy('dt_ano_recursos_osc', 'desc')->get();
        $projetos = DB::connection('map')->table('portal.vw_osc_projeto')->where('id_osc', $id)->get();


        return view($this->module.'.detail', [
            'id_osc' => $id,
            'dados_gerais' => $dados_gerais,
            'area_atuacao' => $area_atuacao,
            'descricao' => $descricao,
            'relacoes_trabalho_governanca' => $relacoes_trabalho_governanca,
            'recursos' => $recursos,
            'projetos' => $projetos,
        ]);
    }

    public function getOsc($territory, $territory_id = null){

        $urlsApi = [
            1 => "https://mapaosc.ipea.gov.br/api/geo/cluster/regiao",
            2 => "https://mapaosc.ipea.gov.br/api/geo/cluster/estado/".$territory_id,
            3 => "https://mapaosc.ipea.gov.br/api/search/estado/geo/".$territory_id,
        ];

        /*"https://mapaosc.ipea.gov.br/api/search/all/lista/10/0" paginação listagem
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

        //cria um array com índices començando de 0
        if($territory == 3){
            $data2 = [];
            foreach ($data as $key => $item) {
                if(count($item) > 0){
                    //$key é o id da osc
                    array_push($data2, [$key, $item[0], $item[1]]);
                }
            }
            $data = $data2;
        }

        $data = [
            "territorio" => $data,
            "idh" => $idh,
            "tipo_territorio" => $territory+1
        ];

        return $data;

    }

    public function getDataOsc($id){
        $pagina = "https://mapaosc.ipea.gov.br/api/osc/popup/".$id;


        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //$data = json_decode($data);

        return $data;

    }

    public function getOscAllUfs(){
        $pgOsc = "https://mapaosc.ipea.gov.br/api/geo/cluster/estado";
        $pgIdh = "https://mapaosc.ipea.gov.br/api/analises/idhgeo";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pgOsc );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $chIdh = curl_init();
        curl_setopt( $chIdh, CURLOPT_URL, $pgIdh );
        curl_setopt( $chIdh, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($chIdh, CURLOPT_SSL_VERIFYPEER, false);
        $dataIdh = curl_exec( $chIdh );
        curl_close( $chIdh );

        $data = json_decode($data);
        $dataIdh = json_decode($dataIdh);

        //return $dataIdh;

        $areas = [];
        $areas['type'] = 'FeatureCollection';
        $areas['features'] = [];
        foreach($data as $index => $valor){
            $areas['features'][$index]['type'] = 'Feature';
            $areas['features'][$index]['id'] = $index;
            $areas['features'][$index]['properties']['uf'] = $valor->tx_nome_regiao;
            $areas['features'][$index]['properties']['nome'] = $valor->tx_sigla_regiao;
            $areas['features'][$index]['properties']['total'] = $valor->nr_quantidade_osc_regiao;
            $areas['features'][$index]['properties']['x'] = $valor->geo_lat_centroid_regiao;
            $areas['features'][$index]['properties']['y'] = $valor->geo_lng_centroid_regiao;
            foreach ($dataIdh->features as $item) {
                if($item->properties->cod_uf == $valor->id_regiao){
                    $areas['features'][$index]['geometry'] = $item->geometry;
                }
            }
        }

        return ['osc' => $areas, 'idh' => $dataIdh];
    }
}
