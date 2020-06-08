<?php
    $show = 0; //COLOCAR VARIAVEL NO BANCO
    $rota = Route::getCurrentRoute()->uri();
    $items = \App\Item::where('modulo_id', $page->id)->where('status', 1)->orderBy('posicao')->get();
?>
@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <style>
        .mb-0{
            background-color: #FFFFFF !important;
            /*border-bottom: solid 1px #3490dc;*/
            font-weight: bold;
            color: #333333;
            margin: 0 0 5px 0 !important;
            border: 0 !important;
        }
        .mb-0:hover{
            background-color: #EEEEEE !important;
        }
        .card {
            border: 0;
            border-radius: 0;
            box-shadow: none !important;
        }
    </style>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$page->titulo}}</h1>
                        <h5><a href="/">Home</a> / {{$page->titulo}}</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
            @if(count($subMenus)>1)
            <div class="col-md-3">
                <ul class="menu-left">
                    @foreach($subMenus as $menu)
                        <li class="list-group-item-theme @if($menu->slug==$rota) menu-left-active @endif" >
                            <a href="{{$menu->slug}}">{{$menu->titulo}}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            @endif
            <div @if(count($subMenus)>1) class="col-md-9" @else class="col-md-12" @endif>
                <article>
                    @if($page->imagem!="")
                    <picture>
                        <source srcset="/imagens/modulos/sm-{{$page->imagem}}" media="(max-width: 468px)">
                        <source srcset="/imagens/modulos/md-{{$page->imagem}}" media="(max-width: 768px)">
                        <source srcset="/imagens/modulos/lg-{{$page->imagem}}" class="img-responsive">
                        <img src="img/loading.gif" data-src="/imagens/modulos/lg-{{$page->imagem}}" alt="Imagem sobre {{$page->titulo}}" title="Imagem sobre {{$page->titulo}}" width="100%" class="img-fluid lazyload">
                    </picture>
                    <br><br>
                    @endif

                    <p  data-message="Esse é do primeiro botão" tabindex="0">{!! $page->descricao !!}</p>

                    @if($items)
                        @include('page.about.accordion')
                    @endif

                    @if($rota=="equipe")
                        <div>
                            @include('page.about.team')
                        </div>
                    @endif

                    @if($rota=="marca")
                        <div>
                            @include('page.about.brand')
                        </div>
                    @endif

                    <br>
                </article>
            </div>
        </div>
    </div>

@endsection
