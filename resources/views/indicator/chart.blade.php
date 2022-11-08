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
                        <h1>{{$text->titulo}}</h1>
                        <h5><a href="/">Home</a> / </h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <br>
                {!!$text->descricao!!}
                <br>
                <br>
            </div>
        </div>
    </div>
    <div id="indicator"></div>

    <br>

@endsection
