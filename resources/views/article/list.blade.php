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
                        <h5>Home / News</h5>
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
                    <a href="artigo/{{$list->id}}/{{$list->title}}">
                        <div>
                            <br>
                            <h5 class="float-right"><i class="fas fa-comment"></i> 5</h5>
                            <img data-src="holder.js/200x200" class="img-fluid" alt="200x200" src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true" width="100%">
                            <br><br>
                            <div class="row">
                                <div class="col-md-6 item-calendar">
                                    <h5><i class="fas fa-calendar"></i> {{$list->date}}</h5>
                                </div>
                                {{--<div class="col-md-6 text-right fa-svg">
                                    <i class="fab fa-facebook-f"></i>
                                    <i class="fab fa-instagram"></i>
                                    <i class="fab fa-twitter"></i>
                                    <i class="fab fa-whatsapp"></i>
                                </div>--}}
                            </div>
                            <h2>{{$list->title}}</h2>
                            <p>{!! $list->tease !!}</p>
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

                    <div>
                        <h4>Fevereiro de 2020</h4>
                        <hr>
                    </div>
                    <div>
                        <h4>Janeiro de 2020</h4>
                        <hr>
                    </div>
                    <div>
                        <h4>Dezembro de 2019</h4>
                        <hr>
                    </div>
                    <h4 class="btn-plus float-right">Mais 15</h4>
                </div>
                <div>
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-folder-open"></i> Categorias</h2>

                    <div>
                        <h4>Saúde</h4>
                        <hr>
                    </div>
                    <div>
                        <h4>Política</h4>
                        <hr>
                    </div>
                    <div>
                        <h4>Esportes</h4>
                        <hr>
                    </div>
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
