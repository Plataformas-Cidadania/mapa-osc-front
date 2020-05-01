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
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> / </h5>
                        <a onclick="window.print()"><i class="fas fa-print float-right"></i></a>
                        <a class=" float-right" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapse1 multiCollapse2 multiCollapse3 multiCollapse4 multiCollapse5 multiCollapse6 multiCollapse7 multiCollapse8"><i class="fas fa-sort-amount-down"></i>&nbsp;</a>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>



    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <div class="alert alert-secondary box-floating">
                    <i class="fas fa-chevron-right menu-icons-close btn-menu-txt"></i>
                    <i class="fas fa-chevron-left menu-icons-close btn-menu-txt-show" style="display: none;"></i>
                    <ul class="menu-icons menu-right">
                        <li id="btn-right"></li>
                        <li><a href="detalhar/1#dados-gerais"><div><i class="far fa-file-alt"></i></div><p class="menu-icons-txt">Dados gerais</p></a></li>
                        <li><a href="detalhar/1#area-atuacao"><div><i class="fas fa-share-alt"></i></div><p class="menu-icons-txt">Área de atuação</p></a></li>
                        <li><a href="detalhar/1#descricao"><div><i class="fas fa-align-justify"></i></div><p class="menu-icons-txt">Descrição da OSC</p></a></li>
                        <li><a href="detalhar/1#titulacao"><div><i class="fas fa-certificate"></i></div><p class="menu-icons-txt">Titulações e Certificações</p></a></li>
                        <li><a href="detalhar/1#governanca"><div><i class="fas fa-briefcase"></i></div><p class="menu-icons-txt">Trabalho e Governança</p></a></li>
                        <li><a href="detalhar/1#participacao"><div><i class="fas fa-users"></i></div><p class="menu-icons-txt">Participação social</p></a></li>
                        <li><a href="detalhar/1#projetos"><div><i class="fas fa-project-diagram"></i></div><p class="menu-icons-txt">Projetos</p></a></li>
                        <li><a href="detalhar/1#fontes"><div><i class="fas fa-boxes"></i></div><p class="menu-icons-txt">Fontes de recursos</p></a></li>
                    </ul>
                    <i class="fas fa-times fa-2x float-right btn-right"></i>
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

    <style>
        .item-detail{
            border-bottom: solid 1px #CCCCCC;
            margin-bottom: 20px;
        }
        .item-detail h4{
            font-weight: bold;
            margin: 0;
        }
        .item-detail p{
        }
        .item-detail svg{
            margin-top: 5px;
        }
        .menu-icons-h{
            /*width: 200px;*/
        }
        .menu-icons-h li{
            display: inline!important;
        }
        .menu-icons-h svg{
            width: 30px!important;
            height: 30px!important;
        }
        .item-obj img{
            float: left;
            margin-right: 10px;
        }
        .item-obj p{
            margin-top: -5px;
        }

        .box-itens{
            padding: 20px 10px;
        }
        .box-itens h3{
            border-bottom: solid 1px #DEA33B;
            font-size: 14px;
            padding-bottom: 5px;
        }
        .box-itens h3 strong{
            font-size: 18px;
        }
        .box-itens h2{
            margin-top: 20px;
        }
        .box-itens p{
            font-size: 11px;
            font-weight: normal;
            line-height: 14px !important;
            margin-top: 20px;
        }


        .box-itens-g{
            padding: 20px 20px;
        }
        .box-itens-g div{
            border-bottom: solid 1px #E6E6E6;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
        .box-itens-g div:last-child{
            border-bottom: 0;
            margin-bottom: 0;
            padding-bottom: 10px;
        }
        .box-itens-g h2{
            border-bottom: solid 1px #DEA33B;
            font-size: 18px;
            padding-bottom: 5px;
            text-align: center;
        }
        .box-itens-g p{
            font-size: 16px;
            margin: 0;
            padding: 0;
        }
        .box-itens-g strong{
            font-size: 12px;
            margin: 0;
        }


        .title-mp{
            padding: 0 10px;
            font-size: 16px;
        }
        .min-h {
            min-height: 400px;
        }
        .line-remove{
            border-bottom: 0!important;
            margin-bottom: 0!important;
            padding-bottom: 0!important;
        }
        .line-add{
            border-bottom: solid 1px #E6E6E6;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
        .line-items p{
            min-height: 40px;
            font-size: 14px;
            line-height: 16px;
            margin: 0;
        }

        .box-itens-m h2{
            font-size: 16px;
            padding: 0;
            margin: 0;
        }
        .box-bg{
            padding: 10px;
            margin-bottom: 10px;
            min-height: 250px;
        }

        #mapPointOsc {
            width: 100%;
            height: 195px;
        }




        .mn-accordion{
            cursor: pointer;
        }
        .mn-accordion-icon {
            border: solid 4px #1b4b72;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            float: left;
            text-align: center;
            line-height: 38px;
            margin: -6px 10px 0 0;
            color: #DEA33B;
        }
        .mn-accordion .mn-accordion-arrow{
            margin-top: -20px
        }
    </style>

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
