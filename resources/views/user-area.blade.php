@extends('layout')
@section('content')

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
            <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div id="menu"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-body" id="content-react">
                        {{--<div id={{$pgUserArea}}></div>--}}
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
