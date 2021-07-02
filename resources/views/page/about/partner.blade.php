<?php
    $partners = DB::table('apoios')->where('status', 1)->orderBy('id', 'desc')->paginate(23);
    $modulo = ['apoio', 'apoios', 'Apoio', 'Apoios'];
?>

    <div class="container">
        <section>
            <div class="row">
                @foreach($partners as $key => $partner)
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                        <div class="items-img text-center">
                            <a href="{{$partner->url}}" target="_blank" data-toggle="modal" data-target="#myModal{{$key}}">
                                <picture>
                                    <source srcset="imagens/{{$modulo[1]}}/sm-{{$partner->imagem}}" media="(max-width: 468px)">
                                    <source srcset="imagens/{{$modulo[1]}}/md-{{$partner->imagem}}" media="(max-width: 768px)">
                                    <source srcset="imagens/{{$modulo[1]}}/lg-{{$partner->imagem}}" class="img-responsive">
                                    <img src="img/pre-img.gif" data-src="imagens/{{$modulo[1]}}/lg-{{$partner->imagem}}" alt="Imagem sobre {{$partner->titulo}}" title="Imagem sobre {{$partner->titulo}}" width="100%" class="img-responsive lazyload">
                                </picture>
                            </a>
                        </div>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="myModal{{$key}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="myModalLabel">{{$partner->titulo}}</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center">
                                        <picture>
                                            <source srcset="imagens/{{$modulo[1]}}/sm-{{$partner->imagem}}" media="(max-width: 468px)">
                                            <source srcset="imagens/{{$modulo[1]}}/md-{{$partner->imagem}}" media="(max-width: 768px)">
                                            <source srcset="imagens/{{$modulo[1]}}/lg-{{$partner->imagem}}" class="img-responsive">
                                            <img src="img/pre-img.gif" data-src="imagens/{{$modulo[1]}}/lg-{{$partner->imagem}}" alt="Imagem sobre {{$partner->titulo}}" title="Imagem sobre {{$partner->titulo}}" width="100%" class="img-responsive lazyload">
                                        </picture>
                                    </div>
                                    {!!$partner->descricao!!}

                                </div>
                                <div class="modal-footer">
                                    <a href="{!!$partner->url!!}" target="_blank">
                                        <button class="btn btn-primary">Acesse o site</button>
                                    </a>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <div>{{ $partners->links() }}</div>
        </section>

    </div>

<style>
    .items-img{
        cursor: pointer;
        margin: 20px 0;
        padding: 10px;
        text-align: center;
        border: solid 1px #EEEEEE;
        border-radius: 5px;
        min-height: 110px;

        transition: .3s;
    }
    .items-img img{
        margin: auto;

    }
    .items-img:hover{
        background-color: #EEEEEE;
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);

        -webkit-transition: 0.3s ease;
        -moz-transition: 0.3s ease;
        -ms-transition: 0.3s ease;
        -o-transition: 0.3s ease;
        transition:  0.3s ease;

        -webkit-filter: none;
        filter: none;
    }
</style>
