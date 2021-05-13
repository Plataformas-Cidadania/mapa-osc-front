@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <?php $midia = DB::table('midias')->where('id', $midia_id)->first();?>

    <script>
            filtros = null;
            midia_id = '{{$midia_id}}';
    </script>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$midia->titulo}}</h1>
                        <h5><a href="/">Home</a>/ {{$midia->titulo}}</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>


    <div id="listPost"></div>


<style>
    .filter-search{
        background-color: inherit;
        border: 0;
        border-bottom: 1px solid #CCCCCC;
        border-radius: 0;
        padding: 0;
        margin: 0;
        height: 25px;
        width: 100%;
        margin-bottom: 15px;
    }
    .filter-input-icon {
        font-size: 10px;
    }
    .filter-input-icon svg{
        font-size: 15px!important;
        margin-top: -35px!important;
    }
    .btn-remove{
        padding: 5px;
        line-height: 15px;
    }
    .btn-remove:hover{
        background-color: #EA4335;
        border-color: #E82F20;
    }
    .btn-remove svg{
        font-size: 12px;
    }
    .form-control-light{
        background-color: inherit;
        border: 0;
        width: 140px;
    }
</style>

@endsection
