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
                        <h1>Mapa</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> </h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <style>
                    #map {
                        width: 100%;
                        height: 600px;
                    }
                </style>
                <br>
                <div id='map'></div>
                <br>
           </div>
        </div>
    </div>


@endsection
