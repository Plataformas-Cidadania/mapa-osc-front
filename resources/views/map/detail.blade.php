@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')
    <?php

    $intOrigem = (int) $origem;
    $localidade = 'localidade';
    if($intOrigem >= 1 && $intOrigem <= 5){
        $localidade = "da região";
    }else if($intOrigem >= 11 && $intOrigem <= 53){
        $localidade = "do estado";
    }else{
        $localidade = "do município";
    }



    ?>

    <script>
        origem = <?php echo $intOrigem;?>;
        localidade = "<?php echo $localidade;?>";
    </script>


    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        {{--@if(!empty($intOrigem))
                            <a href="localidade/{{$intOrigem}}" class="btn btn-outline-primary float-right" style="margin-top: 40px;"><i class="fas fa-chart-bar"></i> Análise {{$localidade}}</a>
                        @endif--}}
                        <br>
                        <h1>Mapa</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Mapa das OSCs</a> </h5>
                        <br>

                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                @if($origem == '0')
                    <div id="search"></div>
                @endif
            </div>
        </div>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <script>
                    origem = "{{$origem}}";
                    @if(isset($json))
                        strJson = '<?php echo $json;?>';
                    @else
                        strJson = "";
                    @endif
                </script>

                <style>
                    .map-load{
                        position:absolute;
                        z-index:5;
                        background-color:rgba(255,255,255,0.5);
                        width:100%;
                        height:600px;
                        margin-right: -15px;
                        margin-left: 0;
                        text-align: center;
                        padding-top: 200px;
                    }
                    .map {
                        width: 100%;
                        height: 600px;
                    }

                    .info {
                        padding: 6px 8px;
                        font: 14px/16px Arial, Helvetica, sans-serif;
                        background: white;
                        background: rgba(255,255,255,0.8);
                        box-shadow: 0 0 15px rgba(0,0,0,0.2);
                        border-radius: 5px;
                        min-width: 150px;
                    }
                    .info h4 {
                        margin: 0 0 5px;
                        color: #777;
                    }

                    .marker{
                        height: 65px !important;
                        width: 65px !important;
                        border:5px solid rgba(255,255,255,0.5);
                        font-weight:bold;
                        text-align:center;
                        border-radius:50%;
                        line-height:30px;
                        margin-top:-30px !important;
                        margin-left:-30px !important;
                        padding-top: 12px;
                    }
                    .marker2{
                        height: 50px !important;
                        width: 50px !important;
                        border:5px solid rgba(255,255,255,0.5);
                        /*font-weight:bold;*/
                        text-align:center;
                        border-radius:50%;
                        line-height:20px;
                        margin-top:-25px !important;
                        margin-left:-25px !important;
                        padding-top: 10px;
                    }

                    .markerCor1{
                        background: #29b6f6;
                    }
                    .markerCor2{
                        background: #ffd54f;
                    }
                    .markerCor3{
                        background: #ffa726;
                    }
                    .markerCor4{
                        background: #ff5722;
                    }
                    .markerCor5{
                        background: #f44336;
                    }
                    /*.control-container{
                        border-radius:5px;
                        border: solid 2px rgba(0,0,0,0.2);
                        background-color: #fff;
                    }*/
                    .control-data-types{
                        border-radius:5px;
                        border: solid 2px rgba(0,0,0,0.2);
                        background-color: #fff;
                        padding: 3px!important;
                    }

                    .control-data-types{
                        /*background-color: #fff;*/
                        padding: 10px;
                        /*border-radius:10px;*/
                        cursor: pointer;
                        font-weight: bold;
                        margin: 0 !important;
                        /*border-bottom: solid 1px #e8e8e8;*/
                        opacity: 0.3;
                    }
                    .control-data-types:hover{
                        /*background-color: #007bff;*/
                        opacity: 1;
                    }
                    .check-control-data-types{
                        /*background-color: #007bff;*/
                        /*color: #fff;*/
                        opacity: 1;
                    }
                    .img-upload-p img{
                        width: 60px!important;
                        height: 60px!important;
                        float: left;
                        margin-right: 10px;
                    }
                    .capitalize{
                        text-transform: capitalize;
                    }
                </style>
                <style>
                    #qrcode {
                        width:160px;
                        height:160px;
                        margin-top:15px;
                    }
                </style>

                <br>
                {{--<div id='map'></div>--}}

                <div id="page"></div>
                <br>
           </div>
        </div>
    </div>

<!--    <div id="perfil"></div>-->

    <style>
        .box-itens-hover{
            background-color: #EEEEEE;
        }
        .box-itens-hover:hover{
            background-color: #3A559B;
            color: #FFFFFF;
        }
        .box-itens-hover h2{
            font-size: 20px;
            font-weight: bold;
        }
        .box-itens-hover h3{
            font-size: 17px;
        }
        .apexcharts-xaxis-label{
            width: 100px;
            max-width: 100px;
        }
    </style>

@endsection
