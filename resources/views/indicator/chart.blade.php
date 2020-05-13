@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')



    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>Dados Indicadores</h1>
                        <h5><a href="/">Home</a> / </h5>
                         <i class="fas fa-columns fa-2x float-right icons-top"></i>
                         <i class="fas fa-bars fa-2x float-right icons-top icons-top-active"></i>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    *<div id="page"></div>*

    <br>
    {{--<div>
        @foreach($areas_atuacao as $area_atuacao)
            <p>{{$area_atuacao->series}} - {{$area_atuacao->labels}}</p>
        @endforeach
    </div>--}}
    {{--<div class="container">
        <div class="row">
            <div class="col-md-3">
                <ul class="menu-left menu-left-chart">

                        <li class="list-group-item-theme  menu-left-active" >
                            <a href="#">1- Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes Regiões, 2018</a>
                        </li>
                        <li class="list-group-item-theme" >
                            <a href="#">2- Número de vínculos formais de trabalho nas OSC, segundo Grandes Regiões, 2018</a>
                        </li>

                </ul>
            </div>
            <div class="col-md-9">
                <div class="box-chart">
                    <div class="title-style" style="perspective: 1000px;">
                        <h2>1 - Distribuição de OSCs, por faixas de vínculo formais, segundo Grandes Regiões, 2018</h2>
                        <div class="line line-fix block" data-move-x="980px" style="opacity: 1; transition: all 1s ease 0s, opacity 1.5s ease 0s;"></div>
                        <hr>
                    </div>
                    <div id="chartPie"></div>
                    <p class="box-chart-font bg-lgt">
                        <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                    </p>
                    <div class="btn btn-outline-primary float-right" data-toggle="modal" data-target=".bd-example-modal-lg">Visualize os dados em tabela</div>
                    <br><br>
                </div>

                <div class="box-chart">
                    <div class="title-style" style="perspective: 1000px;">
                        <h2>2 - Título</h2>
                        <div class="line line-fix block" data-move-x="980px" style="opacity: 1; transition: all 1s ease 0s, opacity 1.5s ease 0s;"></div>
                        <hr>
                    </div>
                    <div id="chartMix"></div>
                    <p class="box-chart-font">
                        <strong>Fonte:</strong> CNPJ/SRF/MF 2018, OSCIP/MJ, RAIS
                    </p>
                    <div class="btn btn-outline-primary float-right" data-toggle="modal" data-target=".bd-example-modal-lg">Visualize os dados em tabela</div>
                    <br><br>
                </div>

                <!-- Modal -->
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <!-- Modal content -->
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Título do modal</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <!-- Modal table -->
                                <table class="table">
                                    <thead class="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Primeiro</th>
                                        <th scope="col">Último</th>
                                        <th scope="col">Nickname</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <!-- Modal table -->
                                <div class="bd-callout bd-callout-warning">
                                    <h5 id="incompatibilidade-jquery">Fonte:</h5>
                                    <p class="box-chart-model-font">Representante de OSC, LIE/MESP 2017, RAIS, CNEAS/MDS, CNPJ/SRF/MF 2018, CEBAS/MS 09/2019, CEBAS/MDS 2017, CNES/MS 2017, CADSOL/MTE 2017, CEBAS/MEC 10/2017, CNEA/MMA 08/2019, OSCIP/MJ, Censo SUAS 08/2019</p>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            </div>
                            <!-- Modal grande -->
                        </div>
                    </div>
                </div>
                <!-- Modal -->



            </div>
        </div>
    </div>--}}
    <style>
        .menu-left-chart li{
            font-size: 13px;
            line-height: 15px;
        }
        .box-chart {
            margin: 0 0 50px 0;
        }
        .box-chart h2{
            font-size: 18px!important;
        }
        .box-chart-font{
            font-size: 12px;
            margin-top: 30px;
            /*border: solid 1px rgba(0, 0, 0, 0.1);*/
            padding: 3px 10px;
            border-radius: 3px;
        }
        .box-chart-model-font{
            font-size: 12px;
            line-height: 16px;
        }
        .bd-callout-warning {
            border-left-color: #f0ad4e!important;
        }
        .bd-callout {
            padding: 1.25rem;
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
            border: 1px solid #eee;
            border-left-width: .25rem;
            border-radius: .25rem;
        }
        .icons-top{
            margin: -20px 5px 5px 5px;
            color: #CCCCCC;
        }
        .icons-top-active{
            color: #3A559B;
        }
    </style>
@endsection
