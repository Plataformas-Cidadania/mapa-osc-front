<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Traversable;

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
        $results = $this->makeParallelRequests($id);
        
        if (!$results['osc'] || !is_object($results['osc'])) {
            abort(404, 'OSC não encontrada');
        }

        $situacaoArray = [];
        if (is_array($results['situacao']) || $results['situacao'] instanceof \Traversable) {
            foreach ($results['situacao'] as $item) {
                if (is_object($item) && isset($item->cd_situacao_cadastral) && isset($item->tx_nome_situacao_cadastral)) {
                    $situacaoArray[$item->cd_situacao_cadastral] = $item->tx_nome_situacao_cadastral;
                }
            }
        }

        $valorSituacao = null;
        if (isset($results['osc']->cd_situacao_cadastral) && isset($situacaoArray[$results['osc']->cd_situacao_cadastral])) {
            $valorSituacao = $situacaoArray[$results['osc']->cd_situacao_cadastral];
        }

        return view($this->module.'.detail', [
            'id_osc' => $id,
            'stituacao_cadastral' => $valorSituacao,
            'situacao' => $results['situacao'],
            'osc' => $results['osc'],
            'cabecalho' => $results['cabecalho'],
            'dados_gerais' => $results['dados_gerais'],
            'descricao' => $results['descricao'],
            'certificacoes' => $results['certificacoes'],
            'area_atuacao' => $results['area_atuacao'],
            'area_atuacao_rep' => $results['area_atuacao_rep'],
            'governancas' => $results['governancas'],
            'conselhos_fiscais' => $results['conselhos_fiscais'],
            'quadros_societarios' => $results['quadros_societarios'],
            'relacoes_trabalho_governanca' => $results['relacoes_trabalho_governanca'],
            'participacao_social_conselhos' => $results['participacao_social_conselhos'],
            'participacao_social_conferencia' => $results['participacao_social_conferencia'],
            'participacao_social_outros' => $results['participacao_social_outros'],
            'recursos' => $results['recursos'],
            'projetos' => $results['projetos'],
            'objetivos_osc' => $results['objetivos_osc'],
        ]);
    }

    private function makeParallelRequests($id) {
        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $urls = [
            'osc' => $api."osc/{$id}",
            'situacao' => $api."situacao_cadastral",
            'cabecalho' => $api."osc/cabecalho/{$id}",
            'dados_gerais' => $api."osc/dados_gerais/{$id}",
            'descricao' => $api."osc/descricao/{$id}",
            'certificacoes' => $api."osc/certificados/{$id}",
            'area_atuacao' => $api."osc/areas_atuacao/{$id}",
            'area_atuacao_rep' => $api."osc/areas_atuacao_rep/{$id}",
            'projetos' => $api."osc/projetos/{$id}",
            'objetivos_osc' => $api."osc/objetivos/{$id}",
            'rel_trabalho_governanca' => $api."osc/rel_trabalho_e_governanca/{$id}",
            'quadros_societarios' => $api."osc/quadro-societario-por-osc/{$id}",
            'participacao_social' => $api."osc/participacao_social/{$id}",
            'recursos' => $api."osc/anos_recursos/{$id}",
        ];

        $multiHandle = curl_multi_init();
        $curlHandles = [];
        $results = [];

        foreach ($urls as $key => $url) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_TIMEOUT, 8);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
            
            curl_multi_add_handle($multiHandle, $ch);
            $curlHandles[$key] = $ch;
        }

        $running = null;
        do {
            curl_multi_exec($multiHandle, $running);
            curl_multi_select($multiHandle);
        } while ($running > 0);

        foreach ($curlHandles as $key => $ch) {
            $data = curl_multi_getcontent($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

            if ($httpCode === 200 && $data) {
                $decoded = json_decode($data);
                $results[$key] = (json_last_error() === JSON_ERROR_NONE) ? $decoded : [];
            } else {
                $results[$key] = [];
            }

            curl_multi_remove_handle($multiHandle, $ch);
            curl_close($ch);
        }

        curl_multi_close($multiHandle);

        // Processar dados específicos
        if ($results['rel_trabalho_governanca']) {
            $data = json_decode(json_encode($results['rel_trabalho_governanca']), true);
            $results['governancas'] = $data['governanca'] ?? [];
            $results['conselhos_fiscais'] = $data['conselho_fiscal'] ?? [];
            $results['relacoes_trabalho_governanca'] = $data['relacoes_trabalho'] ?? [];
        } else {
            $results['governancas'] = [];
            $results['conselhos_fiscais'] = [];
            $results['relacoes_trabalho_governanca'] = [];
        }

        if ($results['participacao_social']) {
            $data = json_decode(json_encode($results['participacao_social']), true);
            $results['participacao_social_conselhos'] = $data['conselhos_politicas_publicas'] ?? [];
            $results['participacao_social_conferencia'] = $data['conferencias_politicas_publicas'] ?? [];
            $results['participacao_social_outros'] = $data['outros_espacos_participacao_social'] ?? [];
        } else {
            $results['participacao_social_conselhos'] = [];
            $results['participacao_social_conferencia'] = [];
            $results['participacao_social_outros'] = [];
        }

        return $results;
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
        Log::info($pgOsc);

        $pgIdh = $api."ipeadata/uffs";
        if(env('LOCALHOST_DOCKER') == 1) {
            $pgIdh = "https://mapaosc.ipea.gov.br/api/api/ipeadata/uffs";//PARA TESTAR LOCALMENTE
        }

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pgOsc );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $dataOsc = curl_exec( $ch );
        curl_close( $ch );
        $dataOsc = json_decode($dataOsc);

        $chIdh = curl_init();
        curl_setopt( $chIdh, CURLOPT_URL, $pgIdh );
        curl_setopt( $chIdh, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($chIdh, CURLOPT_SSL_VERIFYPEER, false);
        $dataIdh = curl_exec( $chIdh );
        curl_close( $chIdh );
        $dataIdh = json_decode($dataIdh);

        //criar array com indices començando de zero, pois o javascript não considera array se os indices forem personalizados
        $dataOscTemp = [];
        foreach ($dataOsc as $item) {
            array_push($dataOscTemp, $item);
            $dataOsc = $dataOscTemp;
        }

        //estrutura de dados para o leaflet
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

        //montando array com geometry de ufs
        $ufsGeometry = [];
        foreach ($areasIdh['features'] as $feature) {
            $ufsGeometry[$feature['properties']['cod_uf']] = $feature['geometry'];
        }

        foreach($dataOsc as $index => $valor){
            $areas['features'][$index]['type'] = 'Feature';
            $areas['features'][$index]['id'] = $index;
            $areas['features'][$index]['properties']['uf'] = $valor->tx_nome_regiao;
            $areas['features'][$index]['properties']['nome'] = $valor->tx_sigla_regiao;
            $areas['features'][$index]['properties']['total'] = $valor->nr_quantidade_osc_regiao;
            $areas['features'][$index]['properties']['x'] = $valor->geo_lat_centroid_regiao;
            $areas['features'][$index]['properties']['y'] = $valor->geo_lng_centroid_regiao;
            $areas['features'][$index]['geometry'] = $ufsGeometry[$valor->id_regiao];
            //foreach ($dataIdh->features as $item) {
            /*foreach ($areasIdh['features'] as $item) {
                //if($item->properties->cod_uf == $valor->id_regiao){
                if($item['properties']['cod_uf'] == $valor->id_regiao){
                    $areas['features'][$index]['geometry'] = $item['geometry'];
                }
            }*/
        }

        return ['osc' => $areas, 'idh' => $areasIdh];
    }

    public function getIDHM($cod_uf){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }
        $pgIdh = $api."ipeadata/municipios/estado/$cod_uf";
        //$pgIdh = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/ipeadata/municipios/estado/$cod_uf";

        $chIdh = curl_init();
        curl_setopt( $chIdh, CURLOPT_URL, $pgIdh );
        curl_setopt( $chIdh, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($chIdh, CURLOPT_SSL_VERIFYPEER, false);
        $dataIdh = curl_exec( $chIdh );
        Log::info(curl_error($chIdh));
        curl_close( $chIdh );

        $dataIdh = json_decode($dataIdh);
        //$dataIdh->type = 'FeatureColleciton';

        //estrutura de dados para o leaflet
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

        // Verificar se os dados foram obtidos corretamente
        if (!$dataJSON || !is_object($dataJSON)) {
            abort(404, 'OSC não encontrada');
        }

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

        $url = $api."osc/busca_avancada/geo/10/0";
        //$url = "https://mapaosc.ipea.gov.br/api/api/osc/busca_avancada/geo/10/0";
        /*if(env('LOCALHOST_DOCKER') == 1) {
            $url = "";
        }*/

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POSTFIELDS, $busca);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        Log::info(curl_error($ch));
        curl_close( $ch );

        //Log::info($data);
        //$data = json_decode($data, true);


        return $data;
    }

    public function buscaAvancadaOscLista(Request $request){
        $offset = 10;
        $data = $request->all();
        $busca = $data['busca'];
        $pagina = $data['pagina']*$offset;

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }
        $url = $api."osc/busca_avancada/lista/$offset/$pagina";
        /*if(env('LOCALHOST_DOCKER') == 1) {
            $url = "";
        }*/


        //Log::info($url);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POSTFIELDS, $busca);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        Log::info(curl_error($ch));
        curl_close( $ch );
        //Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }

    public function exportarAvancadaOsc(Request $request){

        $data = $request->all();
        $busca = $data['busca'];

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $url = $api."osc/exportar";
        /*if(env('LOCALHOST_DOCKER') == 1) {
            $url = "";
        }*/

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_POSTFIELDS, $busca);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        Log::info(curl_error($ch));
        curl_close( $ch );

        //Log::info($data);
        //$data = json_decode($data, true);

        return $data;
    }

    public function listar($page=0){

        $api = env('APP_API_ROUTE');
        if(env('LOCALHOST_DOCKER') == 1){
            $api = env('HOST_DOCKER')."api/";
        }

        $pagina = $api."lista_osc/".$page;

        //return $pagina;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );


        //Log::info(var_dump($data));
        $data = json_decode($data, true);
        //return $data->lista;
        //return $data['lista'];
        //return $data["total"];

        return view('osc.listar', [
            'data' => $data,
            'page' => $page
        ]);

    }

}
