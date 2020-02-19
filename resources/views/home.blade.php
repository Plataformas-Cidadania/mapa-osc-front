@extends('layout')
@section('title', 'Seja Bem Vindo')


@section('content')




<div class="container">


    <section>
        <div class="row">
            <div class="col-md-4 items text-center">
                <picture>
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 468px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 768px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" class="img-responsive">
                    <img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover">
                </picture>
                <div class="items-text">
                    <h2>Mapa das OSCs</h2>
                    <p>Encontre as OSCs no Mapa, listagens e mauito mais</p>
                </div>

            </div>
            <div class="col-md-4 items text-center">
                <picture>
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 468px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 768px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" class="img-responsive">
                    <img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover">
                </picture>
                <div class="items-text">
                    <h2>Mapa das OSCs</h2>
                    <p>Encontre as OSCs no Mapa, listagens e mauito mais</p>
                </div>

            </div>
            <div class="col-md-4 items text-center">
                <picture>
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 468px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" media="(max-width: 768px)">
                    <source srcset="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" class="img-responsive">
                    <img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover">
                </picture>
                <div class="items-text">
                    <h2>Mapa das OSCs</h2>
                    <p>Encontre as OSCs no Mapa, listagens e mauito mais</p>
                </div>

            </div>

        </div>
    </section>

</div>

    <div class="bg-pri space">
        <div class="container">
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="circle">
                    <div id="a" class="rotate">
                        <div class="circle-item">
                            <img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover" width="55">
                        </div>
                    </div>
                    <div id="b" class="rotate">
                        <div class="circle-item">B</div>
                    </div>
                    <div id="c" class="rotate">
                        <div class="circle-item">C</div>
                    </div>
                    <div id="d" class="rotate">
                        <div class="circle-item">
                            <img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover" width="55">
                        </div>
                    </div>
                    <div id="e" class="rotate">
                        <div class="circle-item">E</div>
                    </div>
                </div>
                <div class="circle2">
                    <div id="f" class="rotate2">
                        <div class="circle-item">F</div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <h2>5 OSCs mais próximas de você, por área de atuação</h2>
                <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
            </div>
        </div>
    </div>


    <div class="container">
        <div class="row">
            @foreach($articles as $item)
            <div class="col-md-4">
                <a href="artigo/{{$item->id}}/{{clean($item->title)}}">
                    <div class="img-box">
                        <picture>
                            <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 468px)">
                            <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 768px)">
                            <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" class="img-responsive">
                            <img src="img/loading.gif" data-src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid img-hover lazyload">
                        </picture>
                        <div class="img-rede">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                        </div>sla
                    </div>
                    <br>
                    <h5 class="item-calendar"><i class="fas fa-calendar"></i> {{--{{dataEn2Br($item->date, 'mes_extenso')}}--}}</h5>
                    <h2>{{$item->title}}</h2>
                    <p>{{$item->tease}}</p>
                    <h4 class="btn-plus">Continue lendo</h4>
                </a>
            </div>
                @endforeach

        </div>
    </div>

    <div class="container">
        <div class="space">
            <div id="chart"></div>
            <!-- Large modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <style>
        .circle {
            height: 410px;
            width: 410px;
            border-radius: 100%;
            border: solid 1px #CCCCCC;
            margin:  auto;
            position: relative;
        }

        .circle2 {
            height: 260px;
            width: 260px;
            border-radius: 100%;
            border: solid 1px #CCCCCC;
            margin: -340px  auto 380px auto;
            position: relative;

        }

        .rotate {
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10vh;
            margin-left: -50px;
            display: flex;
            align-items: flex-end;
        }

        .rotate2 {
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10vh;
            margin-left: -50px;
            display: flex;
            align-items: flex-end;
        }

        .rotate div {
            border-radius: 100%;
            border: solid 3px #CCCCCC;
            height: 65px;
            width: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
        }

        .rotate2 div {
            border-radius: 100%;
            border: solid 3px #CCCCCC;
            height: 65px;
            width: 65px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
        }

        #a, #a div,#b, #b div, #c, #c div, #d, #d div, #e, #e div , #f, #f div {
            transition: 1s;
        }

        #a, #b, #c, #d, #e , #f {
            transform-origin: 50px 0;
        }

        #a {
            z-index: 1;
        }

        .circle-item {
            cursor: pointer
        }

        .circle #b {
            transform: rotate(0deg);
        }

        .circle #b div {
            transform: rotate(-0deg);
        }

        .circle #c {
            transform: rotate(-180deg);/*Rotaciona no eixo*/
        }

        .circle #c div {
            transform: rotate(180deg);/*Coloca virado para cima*/
        }

        .circle #d {
            transform: rotate(300deg);
        }

        .circle #d div {
            transform: rotate(60deg);
        }

        .circle #e {
            transform: rotate(60deg);
        }

        .circle #e div {
            transform: rotate(-60deg);
        }

        .circle #a {
            transform: rotate(30deg);
        }

        .circle #a div {
            transform: rotate(-30deg);
        }

        .circle2 #f {
            transform: rotate(30deg); /*Rotaciona no eixo*/
        }

        .circle2 #f div {
            transform: rotate(-30deg); /*Coloca virado para cima*/
        }

    </style>

@endsection


