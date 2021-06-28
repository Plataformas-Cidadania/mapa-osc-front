@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <?php
    $txt_alert = "Não constam informações nas bases de dados do Mapa";
    $txt_alert_abb = "Não informado";

    $objetivo_title = [
        1 => "Erradicação da Pobreza",
        2 => "Fome Zero e Agricultura Sustentável",
        3 => "Saúde e Bem-Estar",
        4 => "Educação de Qualidade",
        5 => "Igualdade de Gênero",
        6 => "Água Potável e Saneamento",
        7 => "Energia Acessível e Limpa",
        8 => "Trabalho Decente e Crescimento Econômico",
        9 => "Indústria, Inovação e Infraestrutura",
        10 => "Redução da Desigualdades",
        11 => "Cidades e Comunidades Sustentáveis",
        12 => "Consumo e Produção Responsáveis",
        13 => "Ação Contra a Mudança Global do Clima",
        14 => "Vida na Água",
        15 => "Vida Terrestre",
        16 => "Paz, Justiça e Instituições Eficazes",
        17 => "Parcerias e Meios de Implementação",
    ];


    ?>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$dados_gerais->tx_razao_social_osc}}</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">OSC</a> / </h5>&nbsp;
                        <div class="fa-svg float-right" style="margin-top: -25px;" >
                            <a class="cursor" title="Imprimir" onclick="window.print()"><i class="fas fa-print fa-2x float-right"></i></a>&nbsp;
                            <a href="declaracao/{{$dados_gerais->id_osc}}" title="Declaração da OSC" target="_blank"><i class="fas fa-certificate fa-2x float-right"></i></a>&nbsp;
                        </div>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>



    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <div class="alert alert-secondary box-floating d-print-none"  style="z-index: 9999999; padding: 10px 5px; width: 45px;">
                    <i class="fas fa-chevron-right menu-icons-close btn-menu-txt" style="float: right;"></i>
                    <i class="fas fa-chevron-left menu-icons-close btn-menu-txt-show" ></i>
                    <ul class="menu-icons menu-right">
<!--                        <li id="btn-right"></li>-->
                        <li><a href="detalhar/974758#dados-gerais"><div><i class="far fa-file-alt"></i></div><p class="menu-icons-txt"> Dados gerais</p></a></li>
                        <li><a href="detalhar/974758#area-atuacao"><div><i class="fas fa-share-alt"></i></div><p class="menu-icons-txt">Área de atuação</p></a></li>
                        <li><a href="detalhar/974758#descricao"><div><i class="fas fa-align-justify"></i></div><p class="menu-icons-txt">Descrição da OSC</p></a></li>
                        <li><a href="detalhar/974758#titulacao"><div><i class="fas fa-certificate"></i></div><p class="menu-icons-txt">Titulações e Certificações</p></a></li>
                        <li><a href="detalhar/974758#governanca"><div><i class="fas fa-briefcase"></i></div><p class="menu-icons-txt">Trabalho e Governança</p></a></li>
                        <li><a href="detalhar/974758#participacao"><div><i class="fas fa-users"></i></div><p class="menu-icons-txt">Participação social</p></a></li>
                        <li><a href="detalhar/974758#projetos"><div><i class="fas fa-project-diagram"></i></div><p class="menu-icons-txt">Projetos</p></a></li>
                        <li style="border-bottom: 0;"><a href="detalhar/974758#fontes"><div><i class="fas fa-boxes"></i></div><p class="menu-icons-txt">Fontes de recursos</p></a></li>
                    </ul>
                    <i class="fas fa-times fa-2x float-right btn-right cursor"></i>
                </div>
                @include('osc.detail-general')
                @include('osc.detail-area')
                @include('osc.detail-description')
                @include('osc.detail-titration')
                @include('osc.detail-governance')
                @include('osc.detail-participation')
                @include('osc.detail-projects')
                @include('osc.detail-resources')
                <br>
            </div>

        </div>

    </div>


    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>

<script>
    var map = L.map('mapPointOsc').setView([{{$dados_gerais->geo_lat}}, {{$dados_gerais->geo_lng}}], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([{{$dados_gerais->geo_lat}}, {{$dados_gerais->geo_lng}}]).addTo(map)
        .bindPopup('{{$dados_gerais->tx_razao_social_osc}}')
        /*.openPopup();*/
</script>



@endsection
