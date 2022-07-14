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
                        <h1>Vídeos</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>


    @if(count($lists)>0)
    <div class="container">

        <br><br>
        <div class="row">
            @foreach($lists as $list)

                    <div class="col-md-3 box-video">
                        <a href="video/{{$list->id}}/{{clean($list->titulo)}}">
                            <img src="http://img.youtube.com/vi/{{substr($list->link_video, 32, 11)}}/0.jpg" alt="" width="100%">
                            <kbd class="float-right">{{substr($list->time, 0, -3)}}</kbd>
                            <h2>{{$list->titulo}} ...</h2>
                            <p>{{$list->views}} visualizações</p>
                            <p>{{formatBr($list->data, 'ext')}}</p>
                            <br>
                            <br>
                        </a>
                    </div>

            @endforeach
        </div>
        <br><br>
        <div>{{ $lists->links() }}</div>
        <br><br>
    </div>
    @endif

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
