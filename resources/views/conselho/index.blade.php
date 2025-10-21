@extends('user-area.layout')
@section('title', 'Conselhos')
@section('content')

<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            @include('conselho.menu')
        </div>
        <div class="col-md-9">
            <div class="card">
                <div class="card-header">
                    <h4><i class="fas fa-users"></i> Meus Conselhos</h4>
                </div>
                <div class="card-body">
                    <div id="conselhos"></div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection