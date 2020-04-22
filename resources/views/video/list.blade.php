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
                        <h1>Védeos</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <br>
        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>Mais Visualizados</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
        </div>
        <div class="row">
            @foreach($listsTop as $list)
            <div class="col-md-3 box-video">
                <a href="video/{{$list->id}}/{{clean($list->title)}}">
                    <img src="http://img.youtube.com/vi/{{substr($list->url, 32, 11)}}/0.jpg" alt="" width="100%">
                    <kbd class="float-right">1:01</kbd>
                    <h2>{{$list->title}} ...</h2>
                    <p>{{--<i class="far fa-eye"></i> --}}{{$list->views}} visualizações</p>
                    <p>{{--<i class="far fa-clock"></i> --}}{{formatBr($list->date, 'ext')}}</p>
                </a>
                <br><br>
            </div>
            @endforeach
        </div>
        <br><br><br>
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>Últimos vídeos</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
        </div>
        <div class="row">
            @foreach($lists as $list)

            <div class="col-md-3 box-video">
                <img src="http://img.youtube.com/vi/{{substr($list->url, 32, 11)}}/0.jpg" alt="" width="100%">
                <kbd class="float-right">1:01</kbd>
                <h2>{{$list->title}} ...</h2>
                <p><i class="far fa-eye"></i> {{$list->views}} visualizações</p>
                <p>2 meses atrás</p>
                <br>
            </div>
            @endforeach
        </div>
        <br><br>
        <div>{{ $lists->links() }}</div>
        <br><br>
    </div>

    <style>
        .box-video h2{
            margin: 10px 0 5px 0;
            font-size: 15px;
            line-height: 18px;
        }
        .box-video p{
            margin: 0!important;
            padding: 0!important;
            font-size: 13px;
            line-height: 18px;
        }
        .box-video kbd{
            position: relative;
            z-index: 2;
            margin:  -30px 5px 0 5px;
            padding: 0 5px;
        }
    </style>
@endsection
