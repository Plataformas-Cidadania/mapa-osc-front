@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <div class="bg-light">
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
                <article>
                    <br>
                    <h5 class="float-right"><i class="fas fa-comment"></i> 5</h5>
                    <img data-src="holder.js/200x200" class="img-fluid img-hover" alt="200x200" src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true" width="100%">
                    <br><br>
                    <div class="row">
                        <div class="col-md-6">
                            <h5><i class="fas fa-calendar"></i> 25 fev 2020</h5>
                        </div>
                        <div class="col-md-6 text-right fa-svg">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-whatsapp"></i>
                        </div>
                    </div>
                    <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <h4 class="btn-plus">Continue lendo</h4>
                    <br>
                    <hr>
                </article>
            </div>
            <div class="col-md-4">
                <br>
                <br>
                <input type="text" class="form-control" placeholder="Busque um artigo">
                <i class="fas fa-search search-input"></i>
                <br>

                <div>
                    <br>
                    <h2>Recentes</h2>
                    <hr>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                </div>

                <div>
                    <br><br>
                    <h2><i class="far fa-calendar"></i> Arquivo</h2>
                    <hr>
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
                    <br><br><br>
                    <h2><i class="far fa-folder-open"></i> Categorias</h2>
                    <hr>
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
                    <h4 class="btn-plus float-right">Mais 3</h4>
                </div>

                <div class="float-none">
                    <br><br><br>
                    <h2><i class="far fa-user"></i> Autores</h2>
                    <hr>
                    <div>
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Fernando Lima</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                    <div>
                        <h4>Ricardo Costa</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                    <div>
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Dezembro de 2019</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                </div>




            </div>
        </div>

    </div>

    <style>
        .fa-svg svg{
            font-size: 18px;
            margin: 0 6px;
        }
        .fa-svg svg:hover{
            color: #3f9ae5;
        }
        h2{
            font-size: 1.5rem;
            line-height: 1.3;
            letter-spacing: .03em;
            font-weight: bold;
        }
        p{
            font-family: opensans-regular,Arial,Helvetica Neue,Helvetica,sans-serif;
            font-size: 1rem;
            line-height: 1.25;
            letter-spacing: .035em;
        }
        h5{
            font-size: 0.9rem;
            color: #949494;
        }
        h4{
            font-size: 1rem;
            line-height: 30px;
        }
        .btn-plus{
            color: #3f9ae5;
            text-decoration: underline;
        }
        .bg-light{
            background-color: #EEEEEE !important
        }
        .search-input{
            float: right;
            margin-top: -28px;
            font-size: 20px;
            margin-right: 10px;
        }
    </style>
@endsection
