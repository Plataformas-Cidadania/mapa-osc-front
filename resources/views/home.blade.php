@extends('layout')
@section('title', 'Seja Bem Vindo')


@section('content')




<div class="container">

    <div class="row justify-content-md-center">
        <div class="col-md-5">
            <br><br>
            <div class="input-icon">
                <input type="text" class="form-control" placeholder="Encontre uma OSC, digite o nome ou CNPJ...">
                <i class="fas fa-search"></i>
            </div>
            <ul class="menu-small">
                <li>Organização</li>
                <li>Município</li>
                <li>Estado </li>
                <li>Região</li>
                <li class="float-right"><i class="fas fa-filter"></i> Filtro</li>
            </ul>
            <br><br><br>
        </div>
    </div>

    <section>
        <div class="row">
            @foreach($teasers as $teaser)
            <div class="col-md-3 col-sm-6 col- items text-center">
                <picture>
                    <source srcset="imagens/teasers/md-{{$teaser->imagem}}" media="(max-width: 468px)">
                    <source srcset="imagens/teasers/md-{{$teaser->imagem}}" media="(max-width: 768px)">
                    <source srcset="imagens/teasers/md-{{$teaser->imagem}}" class="img-responsive">
                    <img src="img/loading.gif" data-src="imagens/teasers/lg-{{$teaser->imagem}}" alt="Imagem sobre {{$teaser->titulo}}" title="Imagem sobre {{$teaser->titulo}}"  class=" rounded-circle lazyload items-hover">
                </picture>
                <div class="items-text">
                    <h2>{{$teaser->titulo}}</h2>
                    <p>{{$teaser->teaser}}</p>
                </div>
            </div>
            @endforeach

        </div>
    </section>
</div>

    <div class="bg-pri space bg-line">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <br><br>
                    <div class="title-style colo-lgt">
                        <h2>OSCs com atualizações mais recentes</h2>
                        <div class="line line-fix block" data-move-x="980px"></div>
                        <hr/>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">

                @foreach($osc_recentes as $osc_recente)
                <div class="col-md-4">
                    <a href="detalhar/{{$osc_recente->id_osc}}/{{clean($osc_recente->tx_nome_osc)}}">
                        <div class="list-user list-lgt">
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="50">
                            <h4 class="capitalize">{{captz($osc_recente->tx_nome_osc)}} <i class="fas fa-angle-right float-right list-icon"></i></h4>
                            <p>Saúde</p>
                            <hr>
                        </div>
                    </a>
                </div>
                @endforeach

                <div class="col-md-12 text-center">
                    <br><br>
                    <a href="mapa/">
                        <button type="button" class="btn btn-outline-light">Visualize todas as OSCs</button>
                    </a>
                    <br><br><br>
                </div>

            </div>
        </div>
    </div>


     <style>
         .bg-map{
             background-image: url("img/bg-map.png");
             background-size: 100%;
             background-position: center -50px;
             background-repeat: no-repeat;
         }
         .bg-line{
             background-image: url("img/bg-line.png");
             background-repeat: no-repeat;
             background-position: right;
             background-size: 40%;
         }
     </style>

    <div class="space">&nbsp;</div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>5 OSCs mais próximas de você, por área de atuação</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
            <div class="col-md-12 text-center">
                <ul class="menu-items">


                    @foreach($areas_atuacao as $area_atuacao)
                    <li>
                        <a href="">
                            <i class="fa fa-user"></i>
                            <p>{{$area_atuacao}}</p>
                        </a>
                    </li>
                    @endforeach


                    {{--<li>
                        <a href="">
                            <i class="fa fa-user"></i>
                            <p>Cultura e recreação</p>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="fa fa-user"></i>
                            <p>Educação e pesquisa</p>
                        </a>
                    </li>--}}
                </ul>
                <br>
            </div>
            <div class="col-md-8 bg-map">
                <div class="circle">
                    @foreach($osc_recentes as $key => $osc_recente)
                    <div id="icon{{$key}}" class="rotate">
                        <div class="circle-item">
                            {{$osc_recente->id_osc}}
                            {{--<img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover" width="55">--}}
                        </div>
                    </div>
                    @endforeach
                </div>
                <div class="circle2">
                    @foreach($osc_recentes as $key => $osc_recente)
                        <div id="icon{{$key}}" class="rotate2">
                            <div class="circle-item">
                                {{$osc_recente->id_osc}}
                                {{--<img src="img/loading.gif" data-src="https://rihappy.vteximg.com.br/arquivos/ids/391006-400-400/quebra-cabeca-3d-mapa-do-brasil-elka-1109_detalhe1.jpg" alt="Imagem sobre " title="Imagem sobre "  class=" rounded-circle lazyload items-hover" width="55">--}}
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="col-md-4">
                <h2>5 OSCs mais próximas de você, por área de atuação</h2>
                <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos.</p>
            </div>
        </div>
    </div>

    <div class="container">
        <div id="page"></div>
    </div>

    <div class="space">&nbsp;</div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>Publicações</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
            @foreach($publicacoes as $item)
                <div class="col-md-4">
                    <a href="artigo/{{$item->id}}/{{clean($item->titulo)}}">
                        <div class="img-box">
                            @if($item->imagem!="")
                            <picture>
                                <source srcset="imagens/publicacoes/sm-{{$item->imagem}}" media="(max-width: 468px)">
                                <source srcset="imagens/publicacoes/sm-{{$item->imagem}}" media="(max-width: 768px)">
                                <source srcset="imagens/publicacoes/md-{{$item->imagem}}" class="img-responsive">
                                <img src="img/loading.gif" data-src="imagens/publicacoes/md-{{$item->imagem}}" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid img-hover lazyload">
                            </picture>
                            @endif
                            <div class="img-rede">
                                <i class="fab fa-facebook-f"></i>
                                <i class="fab fa-instagram"></i>
                                <i class="fab fa-twitter"></i>
                            </div>
                        </div>
                        <br>
                        <time class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($item->data, 'ext')}} </time>
                        <h2>{{$item->titulo}}</h2>
                        <p>{{$item->resumida}}</p>
                        <h4 class="btn-plus">Continue lendo</h4>
                    </a>
                </div>
            @endforeach
            <div class="col-md-12 text-center">
                <br>
                <br>
                <a href="artigos">
                    <button type="button" class="btn btn-outline-primary">Visualize todas as Publicações</button>
                </a>
            </div>
        </div>
    </div>
    <div class="space">&nbsp;</div>

<script>
    //Barra carregamento
    paceOptions = {
        elements: false,
        restartOnRequestAfter: false
    }
</script>

@endsection
