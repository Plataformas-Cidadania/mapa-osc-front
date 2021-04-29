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
                        <h1>Rio de Janeiro</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div id="perfil"></div>
    </div>

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
