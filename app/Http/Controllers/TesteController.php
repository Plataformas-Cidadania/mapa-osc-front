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



    public function buscaOscLista(Request $request){

        $avancado = $request->avancado;

        $avancado = urlencode($avancado);
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/busca_avancada/lista/10/0?avancado=$avancado";
        //Log::info($pagina);

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data, true);

        return $data;
    }

    public function testeLogo($id_osc){
        return view('teste.logo', ['id_osc' => $id_osc]);
    }

    public function testeEstruturaJson(){

        $strJson = '{"dadosGerais":{"tx_razao_social_osc":"Terra+dos+homens","tx_nome_regiao":"Sudeste","tx_nome_fantasia_osc":"Terra+dos","tx_nome_uf":"Rio+de+Janeiro","cd_identificador_osc":"11111111111111","cd_situacao_imovel_osc":"1","anoFundacaoMIN":"1990","anoFundacaoMAX":"2019","tx_nome_municipio":"Rio+de+Janeiro+-+RJ","cd_objetivo_osc":"1","cd_meta_osc":"1","cd_regiao":"3","cd_uf":"33","cd_municipio":"3304557","naturezaJuridica_associacaoPrivada":true,"naturezaJuridica_organizacaoReligiosa":true},"atividadeEconomica":{"tx_atividade_economica":"Agências+de+notícias","cd_classe_atividade_economica":"63917"},"areasSubareasAtuacao":{"cd_subarea_atuacao-1":true,"cd_subarea_atuacao-10":true,"cd_subarea_atuacao-11":true},"titulacoesCertificacoes":{"titulacao_entidadeAmbientalista":true,"titulacao_utilidadePublicaMunicipal":true},"relacoesTrabalhoGovernanca":{"tx_nome_dirigente":"José","tx_cargo_dirigente":"Diretor","tx_nome_conselheiro":"João","totalTrabalhadoresMIN":"0","totalTrabalhadoresMAX":"202","totalEmpregadosMIN":"12","totalEmpregadosMAX":"595","trabalhadoresDeficienciaMIN":"181","trabalhadoresDeficienciaMAX":"701","trabalhadoresVoluntariosMIN":"177","trabalhadoresVoluntariosMAX":"750"},"espacosParticipacaoSocial":{"cd_conselho":"28","dt_data_inicio_conselho":"01/06/2021","tx_nome_representante_conselho":"Maria","cd_tipo_participacao":"1","dt_data_fim_conselho":"01/08/2021","cd_conferencia":"1","cd_forma_participacao_conferencia":"1","anoRealizacaoConferenciaMIN":"1919","anoRealizacaoConferenciaMAX":"1993"},"projetos":{"tx_nome_projeto":"habitacao","cd_status_projeto":"1","cd_origem_fonte_recursos_projeto":"2","tx_nome_financiador":"Ana","tx_nome_regiao_localizacao_projeto":"Rio+de+Janeiro","tx_nome_publico_beneficiado":"baixa+renda","tx_nome_osc_parceira_projeto":"teste+osc+parceira","totalBeneficiariosMIN":"106","totalBeneficiariosMAX":"847","cd_objetivo_projeto":"2","valorTotalMIN":"86.500,00","valorTotalMAX":"776.100,00","cd_meta_projeto":"8","valorRecebidoMIN":"41.700,00","valorRecebidoMAX":"585.100,00"},"fontesRecursos":{"anoFonteRecursoMIN":"1919","anoFonteRecursoMAX":"1992","rendimentosFinanceirosReservasContasCorrentesPropriasMIN":"140.300,00","rendimentosFinanceirosReservasContasCorrentesPropriasMAX":"868.300,00","rendimentosFundosPatrimoniaisMIN":"62.900,00","rendimentosFundosPatrimoniaisMAX":"886.100,00","mensalidadesContribuicoesAssociadosMIN":"124.400,00","mensalidadesContribuicoesAssociadosMAX":"921.400,00","vendaBensDireitosMIN":"62.700,00","vendaBensDireitosMAX":"874.800,00","premiosRecebidosMIN":"119.100,00","premiosRecebidosMAX":"837.200,00","vendaProdutosMIN":"119.100,00","vendaProdutosMAX":"837.200,00","prestacaoServicosMIN":"141.500,00","prestacaoServicosMAX":"886.100,00","empresasPublicasSociedadesEconomiaMistaMIN":"51.800,00","empresasPublicasSociedadesEconomiaMistaMAX":"899.500,00","acordoOrganismosMultilateraisMIN":"71.600,00","acordoOrganismosMultilateraisMAX":"917.000,00","acordoGovernosEstrangeirosMIN":"145.400,00","acordoGovernosEstrangeirosMAX":"838.900,00","parceriaGovernoEstadualMIN":"45.800,00","parceriaGovernoEstadualMAX":"891.200,00","parceriaGovernoMunicipalMIN":"88.800,00","parceriaGovernoMunicipalMAX":"908.400,00","parceriaGovernoFederalMIN":"103.100,00","parceriaGovernoFederalMAX":"888.400,00","parceriaOscBrasileirasMIN":"121.800,00","parceriaOscBrasileirasMAX":"850.700,00","parceriaOscEstrangeirasMIN":"82.500,00","parceriaOscEstrangeirasMAX":"913.600,00","parceriaOrganizacoesReligiosasBrasileirasMIN":"82.500,00","parceriaOrganizacoesReligiosasBrasileirasMAX":"890.000,00","parceriaOrganizacoesReligiosasEstrangeirasMIN":"137.600,00","parceriaOrganizacoesReligiosasEstrangeirasMAX":"890.000,00","empresasPrivadasBrasileirasMIN":"74.700,00","empresasPrivadasBrasileirasMAX":"874.300,00","EmpresasEstrangeirasMIN":"74.700,00","EmpresasEstrangeirasMAX":"866.400,00","doacoesPessoaJuridicaMIN":"153.300,00","doacoesPessoaJuridicaMAX":"933.200,00","doacoesPessoaFisicaMIN":"169.000,00","doacoesPessoaFisicaMAX":"917.500,00","doacoesRecebidasFormaProdutosServicosComNFMIN":"50.100,00","doacoesRecebidasFormaProdutosServicosComNFMAX":"638.200,00","voluntariadoMIN":"43.300,00","voluntariadoMAX":"815.400,00","isencoesMIN":"220.100,00","isencoesMAX":"709.300,00","imunidadesMIN":"204.400,00","imunidadesMAX":"866.400,00","bensRecebidosDireitoUsoMIN":"141.500,00","bensRecebidosDireitoUsoMAX":"815.400,00","doacoesRecebidasFormaProdutosServicosSemNFMIN":"37.100,00","doacoesRecebidasFormaProdutosServicosSemNFMAX":"890.600,00"},"IDH":{"IDH_Municipal":true,"medio":true},"Adicionais":{"cd_indice-13":true,"cd_indice-14":true,"cd_indice-22":true,"cd_indice-23":true,"cd_indice-2":true,"cd_indice-3":true,"cd_indice-4":true,"cd_indice-8":true,"cd_indice-6":true}}';
        $objJson = json_decode($strJson, true);
        return $objJson;
    }

    public function objetivosMetas(){
        //$pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/objetivos/metas/1";
        $pagina = "https://mapaosc.ipea.gov.br/novomapaosc/api/api/osc/objetivos/789809";
        //Log::info($pagina);

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $pagina );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        $data = json_decode($data);

        $objetivos = [];

        foreach ($data as $item) {
            $cdObjetivo = $item->meta_projeto->cd_objetivo_projeto;
            //Log::info(array_search($cdObjetivo, array_column($objetivos, 'cd_objetivo_projeto')));
            if(array_search($cdObjetivo, array_column($objetivos, 'cd_objetivo_projeto')) === false){
                $nome_objetivo = $item->meta_projeto->objetivo_projeto->tx_nome_objetivo_projeto;
                array_push($objetivos, ['cd_objetivo_projeto' => $cdObjetivo, 'tx_nome_objetivo_projeto' => $nome_objetivo, 'metas' => []]);
            }
            $key = array_search($cdObjetivo, array_column($objetivos, 'cd_objetivo_projeto'));
            array_push($objetivos[$key]['metas'], [
                'cd_meta_projeto' => $item->meta_projeto->cd_meta_projeto,
                'tx_nome_meta_projeto' => $item->meta_projeto->tx_nome_meta_projeto,
            ]);

        }

        return $objetivos;
        //return $data;
    }

    public function atividadeEconomica($search){

        $url = "https://mapaosc.ipea.gov.br/api/search/atividade_economica/autocomplete/$search";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function certificados(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/certificado";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function situacaoProjeto(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/status_projeto";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function origemFonteRecursosProjeto(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/origem_fonte_recursos_projeto";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function origemZonaAtuacaoProjeto(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/zona_atuacao_projeto";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function abrangenciaProjeto(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/abrangencia_projeto";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

    public function ipeadata(){

        $url = "https://mapaosc.ipea.gov.br/api/menu/osc/ipeadata";

        $ch = curl_init();
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $data = curl_exec( $ch );
        curl_close( $ch );

        //Log::info($data);
        $data = json_decode($data);

        return $data;
    }

}
