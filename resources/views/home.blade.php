@extends('layout')
@section('title', 'Seja bem-vind@')
@section('description', 'Uma plataforma de transparência pública colaborativa, que reúne dados das organizações da sociedade civil de todo o Brasil')
@section('content')

<div class="container">
    <div id="search"></div>
    <br><br><br>
    <section>
        <div class="row">
            @foreach($teasers as $teaser)
            <div class="col-md-3 col-sm-6 col- items text-center">
                <a href="{{$teaser->url}}">
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
                </a>
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
            <div id="oscsRecentes"></div>
        </div>
    </div>



<!--    <div class="space">&nbsp;</div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div id="nextOsc"></div>
            </div>
        </div>
    </div>-->

    <div style="background-color: #F9F9F9;">
        <br><br><br>
        <div id="home"></div>
    </div>

    <br><br>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="title-style">
                    <h2>Destaques</h2>
                    <div class="line line-fix block" data-move-x="980px"></div>
                    <hr/>
                </div>
            </div>
            @foreach($midias as $item)
                <div class="col-md-4">
                    <a href="post/{{$item->id}}/{{clean($item->titulo)}}">
                        <div class="img-box">
                            @if($item->imagem!="")
                                <div class="thumbs">
                                    <picture>
                                        <source srcset="imagens/posts/sm-{{$item->imagem}}" media="(max-width: 468px)">
                                        <source srcset="imagens/posts/sm-{{$item->imagem}}" media="(max-width: 768px)">
                                        <source srcset="imagens/posts/md-{{$item->imagem}}" class="img-responsive">
                                        <img src="img/loading.gif" data-src="imagens/posts/md-{{$item->imagem}}" alt="Imagem sobre {{$item->titulo}}" title="Imagem sobre {{$item->titulo}}" width="100%" class="img-fluid img-hover lazyload">
                                    </picture>
                                </div>
                            @endif
                           {{-- <div class="img-rede">
                                <i class="fab fa-facebook-f"></i>
                                <i class="fab fa-instagram"></i>
                                <i class="fab fa-twitter"></i>
                            </div>--}}
                        </div>
                        <br>
                        <time class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($item->data, 'ext')}} </time>
                        <h2>{{$item->titulo}}</h2>
                        <p>{{$item->resumida}}</p>
                        <h4 class="btn-plus">Continue lendo</h4>
                    </a>
                </div>
            @endforeach

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

<script>

    $(document).ready(function() {
        var owl = $('.customMn');
        owl.owlCarousel({
            margin: 10,
            nav: true,
            loop: true,
            autoplay:true,
            dots: true,
            navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            autoplayTimeout:15000,
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

    <!-- Modal -->

    <!-- Button trigger modal -->
<!--    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
    </button>-->

    <!-- Modal -->
<!--
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
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
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
-->



    @if(!empty($popup->status))
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">{{-- modal-lg--}}
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <a href="{{$popup->url}}" target="_blank">
                                    <img srcset="/imagens/popups/lg-{{$popup->imagem}}" alt="{{$popup->titulo}}" title="{{$popup->titulo}}" width="100%">
                                    {!! $popup->descricao !!}
                                </a>

                                @if($popup->posicao === 0)
                                    <div id="enquete"></div>
                                @endif



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif





@endsection
