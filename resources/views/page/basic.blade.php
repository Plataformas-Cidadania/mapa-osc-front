<?php $rota = Route::getCurrentRoute()->uri();?>
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
                        <h1>{{$detail->title}}</h1>
                        <h5><a href="/">Home</a> / {{$detail->title}}</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <ul class="menu-left">
                    @foreach($subMenus as $menu)
                        <li class="list-group-item-theme @if($menu->slug==$rota) menu-left-active @endif" >
                            <a href="{{$menu->slug}}">{{$menu->title}}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            <div class="col-md-9">
                <article>
                    <picture>
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 468px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 768px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" class="img-responsive">
                        <img src="img/loading.gif" data-src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre criar uma coluna para descrever a imagem" width="100%" class="img-fluid lazyload">
                    </picture>
                    <br><br>
                    <p  data-message="Esse é do primeiro botão" tabindex="0">{!! $detail->description !!}</p>
                    @if($rota=="equipe")
                        <div>
                            @include('page.about.team')
                        </div>
                    @endif
                    <div>
                        @include('page.about.item')
                    </div>
                    <br>
                </article>
            </div>
        </div>
    </div>

@endsection
