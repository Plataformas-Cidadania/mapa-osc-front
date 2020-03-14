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
                        <h1>Artigos</h1>
                        <h5><a href="/">Home</a></h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8">

                @foreach($lists as $list)
                    <a href="artigo/{{$list->id}}/{{clean($list->title)}}">
                        <div>
                            <br>
                            <h5 class="float-right"><i class="fas fa-comment"></i> 5</h5>
                            <img data-src="holder.js/200x200" class="img-fluid" alt="200x200" src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true" width="100%">
                            <br><br>
                            <div class="row">
                                <div class="col-md-6 item-calendar">
                                    <time class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($list->date, 'ext')}}</time>
                                </div>
                                {{--<div class="col-md-6 text-right fa-svg">
                                    <i class="fab fa-facebook-f"></i>
                                    <i class="fab fa-instagram"></i>
                                    <i class="fab fa-twitter"></i>
                                    <i class="fab fa-whatsapp"></i>
                                </div>--}}
                            </div>
                            <h2 data-message="{{$list->title}}" tabindex="0">{{$list->title}}</h2>
                            <p data-message="{{$list->tease}}" tabindex="0">{!! $list->tease !!}</p>
                            <h4 class="btn-plus">Continue lendo</h4>
                            <br>
                            <hr>
                        </div>
                    </a>
                @endforeach


                <br><br>
                <div>{{ $lists->links() }}</div>


            </div>
            <div class="col-md-4">
                <br>
                <br>
                <div class="input-icon">
                    <input type="text" class="form-control" placeholder="Busque um artigo...">
                    <i class="fas fa-search"></i>
                </div>
                <br>
                <div>
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-calendar"></i> Arquivo</h2>

                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Fevereiro de 2020
                            <span class="badge badge-primary badge-pill">7</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Janeiro de 2020
                            <span class="badge badge-primary badge-pill">x</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Dezembro de 2019
                            <span class="badge badge-primary badge-pill">1</span>
                        </li>
                    </ul>

                    <h4 class="btn-plus float-right">Mais 15</h4>
                </div>
                <div>
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-folder-open"></i> Categorias</h2>

                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Saúde
                            <span class="badge badge-primary badge-pill">7</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Política
                            <span class="badge badge-primary badge-pill">x</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Esportes
                            <span class="badge badge-primary badge-pill">1</span>
                        </li>
                    </ul>

                    <h4 class="btn-plus float-right"><i class="fas fa-angle-down"></i></h4>
                </div>
                <div class="float-none">
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-user"></i> Autores</h2>

                    <div class="list-user">
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Fernando Lima</h4>
                        <p>Pesquisador da Diretoria de Estudos sobre Estado, Instituições e Democracia</p>
                        <hr>
                    </div>
                    <div class="list-user">
                        <h4>Ricardo Costa</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                    <div class="list-user">
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Dezembro de 2019</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
