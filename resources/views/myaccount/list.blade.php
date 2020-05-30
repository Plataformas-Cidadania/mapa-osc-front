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
                        <h1>Lista de OSCs que Representa</h1>
                        <h5><a href="/">Home</a></h5>
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
                <table class="table">
                    <thead class="thead-light">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nome da OSC</th>
                        <th scope="col" class="text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>ABNS Teste OSC</td>
                        <td width="230">
                            <div class="btn btn-primary"><i class="fas fa-binoculars"></i> Detalhes</div>&nbsp;
                            <div class="btn btn-success"><a href="editar-osc"><i class="far fa-edit"></i> Editar</a></div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>ABNS Teste OSC2</td>
                        <td width="230">
                            <div class="btn btn-primary"><i class="fas fa-binoculars"></i> Detalhes</div>&nbsp;
                            <div class="btn btn-success"><a href="editar-osc"><i class="far fa-edit"></i> Editar</a></div>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>



@endsection
