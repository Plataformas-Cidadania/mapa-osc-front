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
                        <h1 data-message="{{$detail->title}}" tabindex="0">{{$detail->title}}</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> / {{str_limit(strip_tags($detail->title), 25)."..."}}</h5>
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

                    <picture>
                        <source srcset="imagens/posts/{{$detail->image}}" media="(max-width: 468px)">
                        <source srcset="imagens/posts/{{$detail->image}}" media="(max-width: 768px)">
                        <source srcset="imagens/posts/{{$detail->image}}" class="img-responsive">
                        <img src="img/loading.gif" data-src="imagens/posts/{{$detail->image}}" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid lazyload" data-message="Imagem sobre " tabindex="0">
                        <!--<figcaption data-message="Fig.1 - Trulli, Puglia, Italy." tabindex="0">Fig.1 - Trulli, Puglia, Italy.</figcaption>-->
                    </picture>

                    <div class="row">
                        <div class="col-md-6 item-calendar">
                            <time pubdate class="item-calendar" data-message="Imagem sobre {{formatBr($detail->date, 'ext', 'hs')}}" tabindex="0"><i class="far fa-clock"></i> {{formatBr($detail->date, 'run')}}{{-- {{formatBr($detail->date, 'ext', 'hs')}}--}}</time>
                        </div>
                        <div class="col-md-6 text-right fa-svg">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-whatsapp"></i>
                        </div>
                    </div>
                    <p data-message="{!! $detail->description !!}" tabindex="0">{!! $detail->description !!}</p>
                    <br>
                    <hr>
                </article>



                <div class="space"></div>
                <div class="row">
                    <div class="col-md-12">
                        <h2 data-message="Deixe seu comentários" tabindex="0"><i class="fas fa-comment"></i> {{$commentsQtd}} comentários</h2>
                        <hr>
                        <br>
                    </div>

                    {{--Formulário--}}
                    <div id="comment"></div>


                    {{--<div class="col-md-6">
                        <div><input type="text" placeholder="Nome" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <div><input type="email" placeholder="E-mail" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-12">
                        <div><textarea class="form-control" ></textarea></div>
                        <br>
                    </div>
                    <div class="col-md-3">
                        <div>
                            <button class="btn btn-primary" >Enviar</button>
                        </div>
                    </div>--}}


                    {{--Formulário--}}
                    <br><br>
                    @foreach($comments as $comment)

                    <div class="col-md-12">
                        <br>
                        <div>
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="40">
                            <div class="row">
                                <div class="col-md-6 text-left">
                                    <h4><strong>{{$comment->name}}</strong></h4>
                                </div>
                                <div class="col-md-6 text-right item-calendar">
                                    <time class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($detail->date, 'abb')}}</time>
                                </div>
                                <div class="col-md-12">
                                    <p><i class="fas fa-quote-left aspa"></i>{{$comment->description}}<i class="fas fa-quote-right aspa aspa-r"></i></p>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                    @endforeach

                </div>


                <div class="space">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <div><i class="fas fa-angle-left"></i> Artigo anterior</div>
                        </div>
                        <div class="col-md-6 text-right">
                            <div>Próximo artigo <i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div>
                    <br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-clock"></i> Recentes</h2>

                    @foreach($lasts as $last)
                        <a href="artigo/{{$last->id}}/{{clean($last->title)}}">
                            <div>
                                <h4><strong>{{$last->title}}</strong></h4>
                                <p>{{$last->tease}}</p>
                                <h4 class="btn-plus">Continue lendo</h4>
                                <hr>
                            </div>
                        </a>
                    @endforeach

                </div>
                <div class="float-none">
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-user"></i> Autores do artigo</h2>
                    <hr>
                    @foreach($members as $member)
                        <div class="list-user">
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt=""
                                 class="rounded-circle float-left" width="40"/>
                            <h4>{{$member->name}}</h4>
                            <hr/>
                        </div>
                    @endforeach


                </div>
            </div>
        </div>

    </div>


@endsection
