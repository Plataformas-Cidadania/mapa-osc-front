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
                        <h1 data-message="{{$detail->titulo}}" tabindex="0">{{$detail->titulo}}</h1>
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
                <article>
                    <br>
                    @if($detail->imagem!="")
                    <picture>
                        <source srcset="imagens/posts/sm-{{$detail->imagem}}" media="(max-width: 468px)">
                        <source srcset="imagens/posts/sm-{{$detail->imagem}}" media="(max-width: 768px)">
                        <source srcset="imagens/posts/md-{{$detail->imagem}}" class="img-responsive">
                        <img src="img/loading.gif" data-src="imagens/posts/lg-{{$detail->imagem}}" alt="Imagem sobre {{$detail->titulo}}" title="Imagem sobre {{$detail->titulo}}" width="100%" class="img-fluid lazyload" data-message="Imagem sobre {{$detail->titulo}}" tabindex="0">
                        <br><br><!-- <figcaption data-message="Fig.1 - Trulli, Puglia, Italy." tabindex="0">Fig.1 - Trulli, Puglia, Italy.</figcaption>-->
                    </picture>
                    @endif

                    <div class="row">
                        <div class="col-md-6 item-calendar">
                            <time pubdate class="item-calendar" data-message="Imagem sobre {{formatBr($detail->date, 'ext', 'hs')}}" tabindex="0"><i class="far fa-clock"></i> {{formatBr($detail->data, 'run')}}{{-- {{formatBr($detail->date, 'ext', 'hs')}}--}}</time>
                        </div>
                        <!--<div class="col-md-6 text-right fa-svg">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-whatsapp"></i>
                        </div>-->
                    </div>
                    <p data-message="{{$detail->descricao}}" tabindex="0">{!! $detail->descricao !!}</p>
                    <br>
                    <br>

                </article>
                @if($detail->arquivo!="")
                    <a href="arquivos/posts/{{$detail->arquivo}}" target="_blank" class="btn btn-outline-primary"><i class="far fa-file-pdf"></i> Baixar o arquivo - PDF</a>
                    <br>
<!--                    <iframe src="arquivos/posts/{{$detail->arquivo}}" frameborder="0" height="1000" width="100%"></iframe>-->
                @endif



            </div>
            <div class="col-md-4">
                <div>
                    <br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-clock"></i> Recentes</h2>

                    @foreach($lasts as $last)
                        <a href="post/{{$last->id}}/{{clean($last->titulo)}}">
                            <div>
                                <h4><strong>{{$last->titulo}}</strong></h4>
                                <p>{{$last->resumida}}</p>
                                <h4 class="btn-plus">Continue lendo</h4>
                                <hr>
                            </div>
                        </a>
                    @endforeach

                </div>

                @if(count($members)>0)
                    <div class="float-none">
                        <br><br>
                        <div class="line-color"></div>
                        <h2><i class="far fa-user"></i> Autores</h2>
                        <hr>
                        @foreach($members as $member)
                            <div class="list-user">
                                <img src="imagens/integrantes/md-{{$member->imagem}}" alt="" class="rounded-circle float-left" width="40"/>
                                <h4>{{$member->titulo}}</h4>
                                <hr/>
                            </div>
                        @endforeach
                    </div>
                @endif

            </div>
        </div>

    </div>


@endsection
