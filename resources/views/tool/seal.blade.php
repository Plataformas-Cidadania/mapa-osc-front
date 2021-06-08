@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')


    @if(!empty($dados_gerais->id_osc))
        <div style="background-color: #34A853;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <header>
                            <br>
                            <i class="far fa-check-circle float-right fa-5x text-light" style="margin-top: -5px"></i>
                            <h1 class="text-light" data-message="" tabindex="0">{{$dados_gerais->tx_razao_social_osc}}</h1>
                            <h5 class="text-light">{{formatBr($hoje = date('d/m/Y'), 'ext')}}</h5>
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
                    <p>{{$dados_gerais->tx_razao_social_osc}}</p><br>
                    <h2><i class="fas fa-medal"></i> Site da OSC</h2>
                    <p>{{$dados_gerais->tx_site}}</p><br>
                    <h2><i class="far fa-check-circle"></i> Índice de Preenchimento</h2>
                    <p>Dados gerais 100%</p>
                    <p>Áreas e Subáreas de Atuação OSC 80%</p>
                    <p>Dados gerais 50%</p>
                    <p>Dados gerais 100%</p>
                    <p>Dados gerais 20%</p>
                </div>
                <div class="col-md-6">
                    <h2>Você encontrou o nosso selo no site {{$dados_gerais->tx_site}}?</h2>
                    <p>O Selo OSC somente são aprovados em sites registrados em nosso banco de dados e ativo. </p>
                    <br>
                    <div class="row">
                        <div class="col-md-6">
                            <img src="https://mapaosc.ipea.gov.br/img/logo.png" alt="" width="100%">
                        </div>
                        <div class="col-md-6">
                            <img src="https://mapaosc.ipea.gov.br/img/logo.png" alt="" width="100%">
                        </div>
                        <div class="col-md-12">
                            <br><br>
                            <a class="btn btn-outline-primary" href="detalhar/{{$dados_gerais->id_osc}}/{{clean($dados_gerais->tx_razao_social_osc)}}">Acesse a página da OSC</a>
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
                            <h5 class="text-light">{{formatBr($hoje = date('d/m/Y'), 'ext')}}</h5>
                            <br>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    @endif



@endsection
