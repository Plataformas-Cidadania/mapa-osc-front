@extends('layout')
@section('title', 'Mapa das OSCs')
@section('description', ('Mapa das OSCs ' . $data['total'] . ' OSCs'))
@section('content')

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$data['total']}} OSCs</h1>
                        <h5><a href="/">Home</a> /  {{$data['total']}} OSCs</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <br><br>

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                @foreach($data['lista'] as $osc)
                    <a href="/detalhar/{{$osc['id_osc']}}/{{clean($osc['tx_nome_osc'])}}">
                        <h2>{{$osc['tx_nome_osc']}}</h2>
                        <p>{{$osc['tx_nome_atividade_economica']}}</p>
                        <p>CNPJ: {{$osc['cd_identificador_osc']}}</p>
                        <p>{{$osc['tx_natureza_juridica_osc']}}</p>
                        <p>{{$osc['tx_endereco_osc']}}</p>
                        <hr>
                    </a>
                @endforeach

                    <a class="btn btn-primary btn-lg" href="/listar-oscs/{{$page+1}}">Próximo</a>
                    <br><br>
            </div>
        </div>
    </div>




@endsection
