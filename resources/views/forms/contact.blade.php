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
                        <h1>Contato</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <div id="mapa"></div>
    <br><br><br><br><br>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div id="contact"></div>
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-12 " style="margin-left: 30px">
                        <br>
                        <div>
                            <div class="address fa-aling">
                                <strong><i class="fas fa-map-marker-alt fa-2x tx-pri"></i> Endereço</strong>
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
                                <strong ><i class="fas fa-clock fa-2x tx-pri"></i> Expediente</strong>
                                <br><br>
                            </div>
                            <div class="address">
                                <div>
                                    Segunda-feira à sexta-feira: 08:00 - 18:00<br>
                                    Sábado: 08:00 - 16:00<br>
                                    Domingo: Fechar
                                </div>
                            </div>
                        </div>

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
