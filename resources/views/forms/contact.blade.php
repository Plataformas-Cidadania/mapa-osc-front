@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')


    <?php
    $hr = date(" H ");
    if($hr >= 12 && $hr<18) {
        $resp = "Boa tarde!";}
    else if ($hr >= 0 && $hr <12 ){
        $resp = "Bom dia!";}
    else {
        $resp = "Boa noite!";}
    ?>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>Contato</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div id="mapa"></div>
    <br><br>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="col-md-12  bg-pri text-light" style="margin-top: -130px; z-index: 999999999; position: relative;">
                    <br>
                    <div>
                        <div class="address fa-aling">
                            <strong><i class="fas fa-map-marker-alt fa-2x"></i> Endereço</strong>
                            <br><br>
                        </div>
                        <address class="address">
                            <div>
                                <strong class="fa-aling">Nosso endereço no Rio de Janeiro</strong><br>
                                Av. Rio de Janeiro - Centro - RJ<br>
                                CEP.: 24456-422<br>
                                <abbr title="Phone"> <i class="fas fa-phone-alt"></i>+55 (21) 2523-2655</abbr>
                            </div>
                        </address>
                        <address class="address">
                            <div>
                                <strong class="fa-aling">Nosso endereço em Brasília</strong><br>
                                Av. Rio de Janeiro - Centro - RJ<br>
                                CEP.: 24456-422<br>
                                <abbr title="Phone"><i class="fas fa-phone-alt"></i> +55 (21) 2523-2655</abbr>
                            </div>
                        </address>
                    </div>
                    <div>
                        <br>
                        <p><i class="fas fa-envelope"></i> nome@dominio.com</p>
                        <br>
                    </div>
                    <div>
                        <div class=" fa-aling">
                            <strong ><i class="fas fa-clock fa-2x"></i> {{$expediente->titulo}}</strong>
                            <br><br>
                        </div>
                        <div class="address">
                            <div>
                                {!!$expediente->descricao!!}
                            </div>
                        </div>
                    </div>
                    <br><br>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-12">
                        <strong>{{$resp}} Prezado usuário,</strong><br>
                        <p>{!!$text->descricao!!}</p>
                    </div>
                    <div class="col-md-12">
                        <br>
                        <div id="contact"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br><br><br><br><br>
    <style>
        #mapa {
            width: 100%;
            height: 400px;
        }
    </style>
    <br>



@endsection
