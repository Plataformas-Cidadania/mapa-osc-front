@extends('layout')
@section('title', 'DEPEN')
@section('description', 'Cadastro Nacional de Participação Social na Execução Penal')
@section('content')

    <style>
        .mb-0{
            background-color: #FFFFFF !important;
            /*border-bottom: solid 1px #3490dc;*/
            font-weight: bold;
            color: #333333;
            margin: 0 0 5px 0 !important;
            border: 0 !important;
        }
        .mb-0:hover{
            background-color: #EEEEEE !important;
        }
        .card {
            border: 0;
            border-radius: 0;
            box-shadow: none !important;
        }
    </style>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>DEPEN - Cadastro Nacional de Participação Social na Execução Penal</h1>
                        <h5><a href="/">Home</a> / DEPEN</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div id="depen"></div>
    </div>

@endsection
