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
                <li class="float-right"><a href="filtro"><i class="fas fa-filter"></i> Filtro</a></li>
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
            <div class="col-md-12">
                {{--OSCs proximas--}}
                <div id="nextOsc"></div>
            </div>

            {{--<div class="custom0 owl-carousel owl-theme">
                @foreach($osc_recentes as $item)
                    <a href="" target="_blank">
                        <div class="item">
                            <picture>
                                <source data-src="/imagens/items/lg-" media="(max-width: 468px)">
                                <source data-src="/imagens/items/md-" media="(max-width: 768px)">
                                <source data-src="/imagens/items/md-" class="img-responsive">
                                <img src="/img/pre-img.gif" data-src="/imagens/items/lg-" alt="Imagem sobre " title="Imagem sobre " width="100%" class="cliente-list-img-hover lazyload">
                            </picture>
                        </div>
                    </a>
                @endforeach
            </div>--}}



        </div>
    </div>

    {{--Chapa chart react--}}
    <div id="home"></div>


    {{--<div class="space">&nbsp;</div>--}}
    <br><br>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>{{$midiaSelect[2]}}</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
            @foreach($midias as $item)
                <div class="col-md-4">
                    <a href="{{$midiaSelect[0]}}/{{$item->id}}/{{clean($item->titulo)}}">
                        <div class="img-box">
                            @if($item->imagem!="")
                            <picture>
                                <source srcset="imagens/{{$midiaSelect[1]}}/sm-{{$item->imagem}}" media="(max-width: 468px)">
                                <source srcset="imagens/publi{{$midiaSelect[1]}}cacoes/sm-{{$item->imagem}}" media="(max-width: 768px)">
                                <source srcset="imagens/{{$midiaSelect[1]}}/md-{{$item->imagem}}" class="img-responsive">
                                <img src="img/loading.gif" data-src="imagens/{{$midiaSelect[1]}}/md-{{$item->imagem}}" alt="Imagem sobre {{$item->titulo}}" title="Imagem sobre {{$item->titulo}}" width="100%" class="img-fluid img-hover lazyload">
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
                <a href="{{$midiaSelect[1]}}">
                    <button type="button" class="btn btn-outline-primary">Visualize todas {{$midiaSelect[3]}}</button>
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

    nextOscTitle = "{{$text->titulo}}";
    nextOscDescription = "{{strip_tags($text->descricao)}}";
    nextOscImg = "imagens/texts/{{$text->imagem}}";

</script>
<style>
    .icon-next{
        background-color: #FFFFFF;
        border: solid 4px #1C4969;
        width: 70px;
        height: 70px;
        margin: auto;
        margin-top: 161px;
        margin-left: 271px;
        border-radius: 50%;
        text-align: center;
        position: absolute;
    }
    .icon-next svg{
        color: #1C4969;
        font-size: 45px;
        margin-top: 7px;

    }
</style>

    <style>
        .menu-items-basic{
            margin: 0;
            padding: 0;
        }
        .menu-items-basic li{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .menu-items-basic svg{
            float: right;
        }
        .menu-items-basic hr{
            margin: 0;
            padding: 3px 0;
        }
    </style>



<script>

    $(document).ready(function() {
        var owl = $('.customMn');
        owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: true,
            autoplay:true,
            navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            autoplayTimeout:5000,
            responsive: {
                0: {
                    items: 5
                },
                600: {
                    items: 8
                },
                1000: {
                    items: 4
                }
            }
        });
    })

</script>

@endsection
