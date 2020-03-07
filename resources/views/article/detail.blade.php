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
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 468px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 768px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" class="img-responsive">
                        <img src="img/loading.gif" data-src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid lazyload">
                        <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
                    </picture>

                    <div class="row">
                        <div class="col-md-6 item-calendar">
                            <time pubdate class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($detail->date, 'ext', 'hs')}}</time>
                        </div>
                        <div class="col-md-6 text-right fa-svg">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-whatsapp"></i>
                        </div>
                    </div>
                    <h2>{{$detail->title}}</h2>
                    <p>{!! $detail->description !!}</p>
                    <br>
                    <hr>
                </article>



                <div class="space"></div>
                <div class="row">
                    <div class="col-md-12">
                        <h2><i class="fas fa-comment"></i> 126 comentários</h2>
                        <hr>
                        <br>
                    </div>

                    {{--Formulário--}}
                    <div class="col-md-6">
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
                    </div>
                    {{--Formulário--}}

                    <div class="col-md-12 space">
                        <div>
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                            <div class="row">
                                <div class="col-md-6 text-left">
                                    <h4><strong>Ricardo Pereira</strong></h4>
                                </div>
                                <div class="col-md-6 text-right item-calendar">
                                    <time class="item-calendar"><i class="fas fa-calendar"></i> {{formatBr($detail->date, 'abb')}}</time>
                                </div>
                                <div class="col-md-12">
                                    <p><i class="fas fa-quote-left aspa"></i>Nulla sit amet sollicitudin orci. Nullam lacinia iaculis dui, eget lacinia erat accumsan dignissim. Ut ut accumsan sapien, quis sagittis risus. Vivamus metus nunc, aliquam sit amet tempor eu, maximus id nunc. Suspendisse potenti.<i class="fas fa-quote-right aspa aspa-r"></i></p>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
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
                        <a href="artigo/{{$last->id}}/{{$last->title}}">
                            <div>
                                <h3>{{$last->title}}</h3>
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
                    <div class="list-user">
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Fernando Lima</h4>
                        <p>Diretor</p>
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
