@extends('layout')
@section('title', 'Mapa das OSCs')
@section('description', '')
@section('content')

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>OSCs</h1>
                        <h5><a href="/">Home</a> / DEPEN</h5>
                        <br>
                    </header>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    @foreach($area['subareas'] as $sub)
                        <p>{{$sub['tx_nome_subarea_atuacao']}}</p>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

@endsection
