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
    {{--//////////////////////--}}

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="accordion" id="accordionExample">

                    @foreach($chartCategorias as $key => $chartCategoria)
                        <div class="card">
                            <div class="card-header" id="chart{{$key}}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse{{$key}}" aria-expanded="true" aria-controls="collapse{{$key}}">
                                       <h2> {{$chartCategoria->titulo}}</h2>
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse{{$key}}" class="collapse {{$key === 0 ? 'show' : ''}}" aria-labelledby="chart{{$key}}" data-parent="#accordionExample">
                                <div class="card-body">
                                    {!! $chartCategoria->descricao !!}
                                </div>
                            </div>
                        </div>
                    @endforeach

                </div>
            </div>
        </div>
    </div>


    {{--//////////////////////--}}
    <br>
@endsection
