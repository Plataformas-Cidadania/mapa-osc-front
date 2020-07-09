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
                        <h1>{{$detail->titulo}}</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> / {{str_limit(strip_tags($detail->titulo), 25)."..."}}</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <br>
                <iframe width="100%" height="450" src="https://www.youtube.com/embed/{{substr($detail->link_video, 32, 11)}}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <br>
                <div class="box-video">
                    <p class="float-left"><i class="far fa-eye"></i> {{$detail->views}} visualizações</p>
                    <p class="float-right"><i class="far fa-clock"></i> {{formatBr($detail->data, 'run')}}</p>
                    <br><br>
                </div>
                <h3>{{$detail->resumida}}</h3>
                <p>{!! $detail->descricao !!}</p>

                <div class="space">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            @if(!empty($prev->id))
                                <a href="video/{{$prev->id}}/{{clean($prev->titulo)}}">
                                    <div><i class="fas fa-angle-left"></i> Vídeo anterior</div>
                                </a>
                            @endif
                        </div>
                        <div class="col-md-6 text-right">
                            @if(!empty($next->id))
                                <a href="video/{{$next->id}}/{{clean($next->titulo)}}">
                                    <div>Próximo vídeo <i class="fas fa-angle-right"></i></div>
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div>
                    <br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-clock"></i> Recentes</h2>
                    @foreach($lists as $list)
                        <a href="video/{{$list->id}}/{{clean($list->titulo)}}">
                            <div class="row box-video">
                                <div class="col-md-5">
                                    <img src="http://img.youtube.com/vi/{{substr($list->link_video, 32, 11)}}/0.jpg" alt="" width="100%">
                                    <kbd class="float-right">{{substr($list->time, 0, -3)}}</kbd>
                                </div>
                                <div class="col-md-7">
                                    <h2 class="box-video-right">{{$list->titulo}} ...</h2>
                                    <p>{{$list->views}} visualizações</p>
                                    <p>{{formatBr($list->data, 'ext')}}</p>
                                </div>
                            </div>
                            <hr>
                        </a>
                    @endforeach
                </div>
            </div>
        </div>
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
        .box-video-right{
            margin-top: 0!important;
        }
    </style>
@endsection
