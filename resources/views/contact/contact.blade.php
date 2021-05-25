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
    <br>

    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <br><br>
                <h3>Contact Details</h3>
                <p>Our Medical Center is the preferred choice for diplomats and employees from 64 embassies, consulates and UN agencies, as well as private patients from over 60 countries.</p>
            </div>
            <div class="col-md-7">
                <br><br>
                <div class="row">
                    {{--Formulário--}}
                    <div class="col-md-6">
                        <div><input type="text" placeholder="Nome" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <div><input type="email" placeholder="E-mail" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-4">
                        <div><input type="text" placeholder="Telefone" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-4">
                        <div><input type="text" placeholder="Celular" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-12">
                        <div><textarea class="form-control" rows="5"></textarea></div>
                        <br>
                    </div>
                    <div class="col-md-3">
                        <div>
                            <button class="btn btn-primary" >Enviar</button>
                        </div>
                    </div>
                    {{--Formulário--}}
                </div>
            </div>
        </div>
    </div>
    <br><br>



    <div class="bg-pri">
        <div class="container">
            <br>
            <div class="row">
                <div class="col-md-6">
                    <address>
                        <h2 class="tx-pri">Rio de Janeiro</h2>
                        Av. Presidente Vargas, 730, 16° andar - Centro - RJ<br>
                        Torres: 3 e 4<br>
                        CEP.: 20071-900<br>
                        <abbr title="Phone">+55 (21) 2523-2655</abbr>
                    </address>
                </div>
                <br>
                <div class="col-md-6">
                    <address>
                        <h2 class="tx-pri">Brasília</h2>
                        SBS - Quadra 1 - Bloco J - Brasília - DF<br>
                        Edifício: BNDES<br>
                        CEP.: 70076-900<br>
                        <abbr title="Phone">+55 (61) 2026-5501</abbr>
                    </address>
                </div>
            </div>
            <br>
            <br>
        </div>
    </div>


    <div class="row">
        <div class="col-md-12">
            <style>
                #mapa {
                    width: 100%;
                    height: 400px;
                }
                .invalid-field{
                    background-color: red;
                }
            </style>
            <br>
            <div id="mapa"></div>
            <br>
        </div>
    </div>
@endsection
