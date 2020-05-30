@extends('layout')
@section('title', 'Pagamento')
@section('content')
    <div class="container">
        <h1 class="text-primary">Os produtos abaixo não possuem estoque suficiente!</h1>
        <div class="line_title bg-pri"></div>

        <session class="container">
            <div class="row">
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Qtd Desejada</th>
                            <th>Qtd Disponível</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($products as $product)
                            <tr>
                                <td>{{$product->titulo}}</td>
                                <td>{{$product->qtd_carrinho}}</td>
                                <td>{{$product->qtd}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <br><br>
            <div class="row">
                <div class="col-md-12 text-center">
                    <a class="btn btn-theme btn-theme-full btn-store" href="/carrinho"><i class="fa fa-shopping-basket"></i> Retornar ao Carrinho</a>
                </div>
            </div>
        </session>
    </div>
@endsection