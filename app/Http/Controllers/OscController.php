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

        $cabecalho = curl('cabecalho', $id);
        $dados_gerais = curl('dados_gerais', $id);
        $descricao = curl('descricao', $id);

        $certificacoes = curlList('certificados', $id);
        $area_atuacao = curlList('areas_atuacao', $id);
        $area_atuacao_rep = curlList('areas_atuacao_rep', $id);
        $projetos = curlList('projetos', $id);

        $objetivos_osc = curlList('objetivos', $id);

        //Log::info($area_atuacao_rep);



        $governancas = curlListParametros('rel_trabalho_e_governanca', $id, 'governanca');
        $conselhos_fiscais = curlListParametros('rel_trabalho_e_governanca', $id, 'conselho_fiscal');
        $relacoes_trabalho_governanca = curlListParametros('rel_trabalho_e_governanca', $id, 'relacoes_trabalho');

        $participacao_social_conselhos = curlListParametros('participacao_social', $id, 'conselhos_politicas_publicas');
        $participacao_social_conferencia = curlListParametros('participacao_social', $id, 'conferencias_politicas_publicas');
        $participacao_social_outros = curlListParametros('participacao_social', $id, 'outros_espacos_participacao_social');

        $recursos = curlList('anos_recursos', $id);


        return view($this->module.'.detail', [
            'id_osc' => $id,
            'cabecalho' => $cabecalho,
            'dados_gerais' => $dados_gerais,
            'descricao' => $descricao,
            'certificacoes' => $certificacoes,

            'area_atuacao' => $area_atuacao,
            'area_atuacao_rep' => $area_atuacao_rep,

            'governancas' => $governancas,
            'conselhos_fiscais' => $conselhos_fiscais,
            'relacoes_trabalho_governanca' => $relacoes_trabalho_governanca,

            'participacao_social_conselhos' => $participacao_social_conselhos,
            'participacao_social_conferencia' => $participacao_social_conferencia,
            'participacao_social_outros' => $participacao_social_outros,

            'recursos' => $recursos,
            'projetos' => $projetos,
            'objetivos_osc' => $objetivos_osc,
        ]);
    }

    public function getOscsUf($estado_id){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $pagina = $api."geo/oscs/estado/".$estado_id;

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data);

        $data2 = [];
        foreach ($data as $key => $item) {
            array_push($data2, [$item->id_osc, $item->geo_lat, $item->geo_lng]);
        }
        $data = $data2;

        return $data;
    }

    public function getDataOsc($id){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $pagina = $api."osc/popup/".$id;


        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //$data = json_decode($data);

        /*$data2 = [];
        foreach ($data as $key => $item) {
            array_push($data2, [$item->id_osc, $item->geo_lat, $item->geo_lng]);
        }
        $data = $data2;*/

        return $data;

    }

    public function getGeoOscSearch($osc){
        $pagina = "https://mapaosc.ipea.gov.br/api/search/osc/geo/$osc/0/0/1";
        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        return $data;
    }



    public function getOscAllUfs(){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }
        $pgOsc = $api."geo/estados";
        //$pgOsc = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/geo/estados";
        //$pgOsc = "https://mapaosc.ipea.gov.br/api/geo/cluster/estado";
        //Log::info($pgOsc);

        //$pgIdh = "https://mapaosc.ipea.gov.br/api/analises/idhgeo";

        $pgIdh = $api."ipeadata/uffs";
        //$pgIdh = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/ipeadata/uffs";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pgOsc );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $dataOsc = curl_exec( $ch );

        curl_close( $ch );

        $chIdh = curl_init();
        curl_setopt( $chIdh, CURLOPT_URL, $pgIdh );
        curl_setopt( $chIdh, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($chIdh, CURLOPT_SSL_VERIFYPEER, false);
        $dataIdh = curl_exec( $chIdh );

        curl_close( $chIdh );


        //Log::info([$dataOsc]);
        $dataOsc = json_decode($dataOsc);
        //Log::info([$dataOsc]);
        //criar array com indices començando de zero, pois o javascript não considera array se os indices forem personalizados
        $dataOscTemp = [];
        foreach ($dataOsc as $item) {
            array_push($dataOscTemp, $item);
            $dataOsc = $dataOscTemp;
        }

        //Log::info($dataIdh);
        $dataIdh = json_decode($dataIdh);
        //$dataIdh->type = 'FeatureColleciton';

        //colocando os dados retornados da API nova no modelo da API antiga
        //para alimentar o padrão que já existe no front
        $areasIdh = [];
        $areasIdh['type'] = 'FeatureCollection';
        $areasIdh['features'] = [];
        foreach ($dataIdh as $index => $valor) {
            $areasIdh['features'][$index]['type'] = 'Feature';
            $areasIdh['features'][$index]['id'] = $index;
            $areasIdh['features'][$index]['properties']['nm_uf'] = $valor->eduf_nm_uf;
            $areasIdh['features'][$index]['properties']['Regiao'] = $valor->edre_cd_regiao;
            $areasIdh['features'][$index]['properties']['cod_uf'] = $valor->eduf_cd_uf;
            $areasIdh['features'][$index]['properties']['nr_valor'] = $valor->nr_valor;
            $areasIdh['features'][$index]['geometry'] = json_decode($valor->eduf_geometry);
        }

        $areas = [];
        $areas['type'] = 'FeatureCollection';
        $areas['features'] = [];
        foreach($dataOsc as $index => $valor){
            $areas['features'][$index]['type'] = 'Feature';
            $areas['features'][$index]['id'] = $index;
            $areas['features'][$index]['properties']['uf'] = $valor->tx_nome_regiao;
            $areas['features'][$index]['properties']['nome'] = $valor->tx_sigla_regiao;
            $areas['features'][$index]['properties']['total'] = $valor->nr_quantidade_osc_regiao;
            $areas['features'][$index]['properties']['x'] = $valor->geo_lat_centroid_regiao;
            $areas['features'][$index]['properties']['y'] = $valor->geo_lng_centroid_regiao;
            //foreach ($dataIdh->features as $item) {
            foreach ($areasIdh['features'] as $item) {
                //if($item->properties->cod_uf == $valor->id_regiao){
                if($item['properties']['cod_uf'] == $valor->id_regiao){
                    $areas['features'][$index]['geometry'] = $item['geometry'];
                }
            }
        }

        //return ['osc' => $areas, 'idh' => $dataIdh];
        return ['osc' => $areas, 'idh' => $areasIdh];
    }

    public function getIDHM($cod_uf){
        //$pgIdh = "https://mapaosc.ipea.gov.br/api/analises/idhgeo/$cod_uf";

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }
        $pgIdh = $api."ipeadata/municipios/estado/$cod_uf";
        //$pgIdh = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/ipeadata/municipios/estado/$cod_uf";
        //Log::info($pgIdh);

        $chIdh = curl_init();
        curl_setopt( $chIdh, CURLOPT_URL, $pgIdh );
        curl_setopt( $chIdh, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($chIdh, CURLOPT_SSL_VERIFYPEER, false);
        $dataIdh = curl_exec( $chIdh );
        Log::info(curl_error($chIdh));
        curl_close( $chIdh );

        $dataIdh = json_decode($dataIdh);
        //$dataIdh->type = 'FeatureColleciton';

        //colocando os dados retornados da API nova no modelo da API antiga
        //para alimentar o padrão que já existe no front
        $areasIdh = [];
        $areasIdh['type'] = 'FeatureCollection';
        $areasIdh['features'] = [];
        foreach ($dataIdh as $index => $valor) {
            $areasIdh['features'][$index]['type'] = 'Feature';
            $areasIdh['features'][$index]['id'] = $index;
            $areasIdh['features'][$index]['properties']['nm_municipio'] = $valor->edmu_nm_municipio;
            $areasIdh['features'][$index]['properties']['municipio'] = $valor->edmu_cd_municipio;
            $areasIdh['features'][$index]['properties']['nr_valor'] = $valor->nr_valor;
            $areasIdh['features'][$index]['geometry'] = json_decode($valor->edmu_geometry);
        }

        return ['idh' => $areasIdh];
        //return ['idh' => $dataIdh];

    }

    public function declaration($id_osc){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }
        $pg = $api."osc/cabecalho/".$id_osc;
        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pg );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        $data = curl_exec( $ch );
        //Log::info(curl_error($ch));
        curl_close( $ch );
        $dataJSON = json_decode($data);

        //return ['osc' => $dataJSON];

        return view($this->module.'.declaration', ['osc' => $dataJSON, 'id_osc' => $id_osc]);
    }

    public function getAllOscs(){

        $ufs = [11,12,13,14,15,16,17,21,22,23,24,25,26,27,28,29,31,32,33,35,41,42,43,50,51,52,53];
        //$ufs = [11,12,13,14,15,16,17,21,22,23,24,25,26];

        $data2 = [];

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        foreach ($ufs as $uf) {
            //$pagina = "https://mapaosc.ipea.gov.br/api/search/estado/geo/".$uf;
            $pagina = $api."geo/oscs/estado/".$uf;
            //$pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/geo/oscs/estado/".$uf;

            $ch = curl_init();
            curl_setopt( $ch, CURLOPT_URL, $pagina );
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $data = curl_exec( $ch );
            curl_close( $ch );

            $data = json_decode($data);

            foreach ($data as $key => $item) {
                if($key > 0){
                    //$item[0] = floatval($item[0]);
                    //$item[1] = floatval($item[1]);
                    array_push($data2, $item);
                }
            }
        }

        return $data2;

    }

    public function seal($id_osc){
        return view('user-area', ['pgUserArea' => 'seal', 'id_osc' => $id_osc]);
    }


    public function buscaAvancadaOscGeo(Request $request){

        $data = $request->all();
        $busca = $data['busca'];

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $pagina = $api."osc/busca_avancada/geo/10/0";
        //$pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/busca_avancada/geo/10/0";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POSTFIELDS, $busca);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }


    public function buscaAvancadaOscLista(Request $request){

        $data = $request->all();
        $busca = $data['busca'];
        $pagina = $data['pagina'];

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/busca_avancada/lista/10/$pagina";
        //$url = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/busca_avancada/lista/10/$pagina";
        //Log::info($url);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POSTFIELDS, $busca);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }

}
