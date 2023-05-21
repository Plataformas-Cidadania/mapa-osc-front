@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <?php
    $logo = "img/sem-imagem.png";
    if($dados_gerais['im_logo']!=''){
        $pagina = env('APP_API_ROUTE')."osc/logo/".$id_osc;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $pagina);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $logo = curl_exec($ch);
        $error = curl_error($ch);
        curl_close($ch);
        $logo = substr($logo, 1);
        $logo = substr($logo, 0, -1);
        $logo = str_replace("\\", "", $logo);
    }
    ?>

    @if(!empty($dados_gerais['cd_identificador_osc']))
        <div style="background-color: #34A853;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <header>
                            <br>
                            <i class="far fa-check-circle float-right fa-5x text-light" style="margin-top: -5px"></i>
                            <h1 class="text-light" data-message="" tabindex="0">{{$dados_gerais['tx_razao_social_osc']}}</h1>
                            <h5 class="text-light">{{$hoje = date('d/m/Y')}}</h5>
                            <br>
                        </header>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>
        <div class="container">
            <div class="row">
                <div class="col-md-6">

                    <h2><i class="fas fa-hotel"></i> Razão Social</h2>
                    <p>{{$dados_gerais['tx_razao_social_osc']}}</p><br>
                    <h2><i class="fas fa-medal"></i> Site da OSC</h2>
                    <p>{{$dados['tx_site']}}</p><br>
                    <h2><i class="far fa-check-circle"></i> Índice de Preenchimento</h2>
                    @if(!empty($indice[0]))
                        <p>Dados gerais: <strong>{{$indice[0]['transparencia_dados_gerais']}}%</strong></p>
                        <p>Áreas e subáreas de atuação OSC: <strong>{{$indice[0]['transparencia_area_atuacao']}}%</strong></p>
                        <p>Descrição da OSC: <strong>{{$indice[0]['transparencia_descricao']}}%</strong></p>
                        <p>Titulações e certificações: <strong>{{$indice[0]['transparencia_descricao']}}%</strong></p>
                        <p>Relações de trabalho e governança: <strong>{{$indice[0]['transparencia_relacoes_trabalho_governanca']}}%</strong></p>
                        <p>Espaços de participação social: <strong>{{$indice[0]['transparencia_espacos_participacao_social']}}%</strong></p>
                        <p>Projetos, atividades e/ou programas: <strong>{{$indice[0]['transparencia_projetos_atividades_programas']}}%</strong></p>
                        <p>Fontes de recursos anuais da OSC: <strong>{{$indice[0]['transparencia_fontes_recursos']}}%</strong></p>
                        <p>Total: <strong>{{$indice[0]['transparencia_osc']}}%</strong></p>
                    @else
                        <p><strong>A OSC não possui índice de preenchimento</strong></p>
                        <p>Gestor, preencha com informações sobre sua OSC para ver o índice aqui! </p>

                    @endif
                </div>
                <div class="col-md-6">
                    <h2>Você encontrou o nosso selo no site {{$dados['tx_site']}}?</h2>
                    <p>O Selo OSC somente são aprovados em sites registrados em nosso banco de dados e ativo. </p>
                    <br>
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://mapaosc.ipea.gov.br/img/logo.png" alt="" width="100%">
                        </div>
                        <div class="col-md-6">
                            <img src="{{$logo}}" alt="{{$dados_gerais['tx_razao_social_osc']}}" title="{{$dados_gerais['tx_razao_social_osc']}}" width="100%">
                        </div>
                        <div class="col-md-12">
                            <br><br>
                            <a class="btn btn-outline-primary" href="detalhar/{{$id_osc}}/{{clean($dados_gerais['tx_razao_social_osc'])}}">Acesse a página da OSC</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br><br>

    @else
        <div style="background-color: #EA4335;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <header>
                            <br>
                            <i class="far fa-times-circle float-right fa-5x text-light" style="margin-top: -5px"></i>
                            <h1 class="text-light" data-message="" tabindex="0">A OSC não esta cadastrada no nossa base de dados!</h1>
                            <h5 class="text-light">{{$hoje = date('d/m/Y')}}</h5>
                            <br>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    @endif



@endsection
