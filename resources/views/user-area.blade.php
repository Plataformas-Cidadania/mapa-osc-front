@extends('layout')
@section('content')

    <?php $rota = Route::getCurrentRoute()->uri();?>
    <script>
        maxAddresses = 10;
        maxCertificates = 200;
        maxGovernancas = 200;
        maxConselhos = 200;
        maxAtuacoes = 200;
        maxParticipacoes = 200;
        maxRecursos = 200;
        maxProjetos = 200;
    </script>

    <div id="header"></div>
    <br><br>
    <div class="container">
        <div id="header-user"></div>
        <div class="row">
            @if($rota!="selo-osc-user/{id_osc}")
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="menu"></div>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-md-3 text-center">
                    <div style="border: solid 1px #F1F1F1; border-radius: 5px; padding: 15px;">
                        <img src='{{env('APP_URL')}}img/logo.png' width="100%"/>
                        <br><br>
                        Página validação da OSC:<br>
                        <a href="{{env('APP_URL')}}selo-osc/{{$id_osc}}" class="btn btn-outline-primary">Acesse aqui</a>
                    </div>

                </div>
            @endif


            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-body" id="content-react">

                    </div>
                    <script>
                        let token = localStorage.getItem('@App:token');
                        if(token){
                            let divReact = document.createElement('div');
                            divReact.id = "{{$pgUserArea}}";
                            let contentReact = document.getElementById('content-react');
                            console.log(contentReact);
                            contentReact.appendChild(divReact);
                        }
                    </script>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <div id="footer"></div>
    <style>
        .label-float label {
            top: calc(48% - 28px);
        }
    </style>
@endsection
