<div class="bg-lgt" id="acessibilidade">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <ul id="atalhos">
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodoconteudo" accesskey="1">Ir para o Conteúdo [1]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodomenu" accesskey="2">Ir para o Menu [2]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#busca" accesskey="3">Ir para a busca [3]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodorodape" accesskey="4">Ir para o rodapé [4]</a></li>
                </ul>
            </div>
            <div class="col-md-6 text-lg-right text-md-right">
                <ul id="botoes" >
                    <li>A+</li>
                    <li>A</li>
                    <li>A-</li>
                    <li><a id="bt_contraste" ><i class="fa fa-adjust" aria-hidden="true"></i> Acessibilidade</a></li>
                    <li><a href="acessibilidade"><i class="fa fa-universal-access" aria-hidden="true"></i> Alto contraste </a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

{{--CEl--}}
<div class="header-cel text-center  d-block d-sm-none" >
    <div class="row">
        <div class="col-xs-2">
            <div class="btn-cel" ng-click="MinhaDiv = !MinhaDiv">
                <div class="btn-line btn-line-off"></div>
                <div class="btn-line btn-line-rotate"></div>
                <div class="btn-line btn-line-close"></div>
                <div class="btn-line btn-line-off"></div>
            </div>
        </div>
        <div class="col-xs-8">
            {{-- <img src="img/logo.png" alt="" >--}}
            <a href="/">
                {{--<picture>
                    <source srcset="/imagens/settings/sm-{{$setting->imagem}}" media="(max-width: 468px)">
                    <source srcset="/imagens/settings/{{$setting->imagem}}" class="img-responsive">
                    <img src="/img/pre-img.gif" srcset="/imagens/settings/{{$setting->imagem}}" alt="{{$setting->titulo}}" title="{{$setting->titulo}}" style="width: 160px;">
                </picture>--}}
            </a>
        </div>
        <div class="col-xs-2"></div>
    </div>
</div>
<div class="menu-cel hidden-lg hidden-md hidden-sm ng-hide"  ng-show="MinhaDiv">
    <div class="menu-cel-redes">
        {{--@if($setting->pinterest!="")<a href="{{$setting->pinterest}}" target="_blank"><i class="fab fa-pinterest-square font-color" aria-hidden="true"></i></a>@endif
        @if($setting->instagram!="")<a href="{{$setting->instagram}}" target="_blank"><i class="fab fa-instagram font-color" aria-hidden="true"></i></a>@endif
        @if($setting->twitter!="")<a href="{{$setting->twitter}}" target="_blank"><i class="fab fa-twitter font-color" aria-hidden="true"></i></a>@endif
        @if($setting->youtube!="")<a href="{{$setting->youtube}}" target="_blank"><i class="fab fa-youtube-square font-color" aria-hidden="true"></i></a>@endif
        @if($setting->blog!="")<a href="{{$setting->blog}}" target="_blank"><i class="fab fa-blogger font-color" aria-hidden="true"></i></a>@endif
        @if($setting->facebook!="")<a href="{{$setting->facebook}}" target="_blank"><i class="fab fa-facebook-square font-color" aria-hidden="true"></i></a>@endif--}}
        <i class="fa fa-ins" aria-hidden="true"></i>
        <hr class="hr-cel">
    </div>
    <ul>
        <li><a href="/">Ínicio</a></li>
        <li><a href="/institucional">Empresa</a></li>
        <li><a href="/produtos">Produtos</a></li>
        <li><a href="/seguradoras">Seguradoras</a></li>
        <li><a href="/contato">Contato</a></li>
    </ul>
</div>
<div class="box-menu ng-hide" ng-show="MinhaDiv"></div>
{{--CEl--}}



<header id="iniciodoconteudo"  role="banner">

    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                        Logo site
                    </a>
                    <div>
                        <a href="http://localhost/mapa-osc-laravel/">Home</a>
                        <a href="artigos">Artigos</a>
                        <div class="btn-group">
                            <div class="login" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="login-icon rounded-circle">
                                    <i class="far fa-user"></i>
                                </div>
                                <p>Olá, faça seu login ou se cadastre-se</p>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button">Configurar conta</button>
                                <button class="dropdown-item " type="button">Editar</button>
                                <button class="dropdown-item" type="button">Sair</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>





        {{--<div class="owl-carousel owl-theme">
            <picture>
                --}}{{--<source srcset="/imagens/mobiledoors/lg-" media="(max-width: 468px)">
                <source data-src="/imagens/webdoors/md-" media="(max-width: 768px)">
                <source data-src="/imagens/webdoors/lg-" class="img-responsive">
                <img src="/pre-img-wide.gif" data-src="/imagens/webdoors/lg-" alt="Imagem sobre " title="Imagem sobre " width="100%" class="lazyload">--}}{{--
                <img src="https://mapaosc.ipea.gov.br/cms/imagens/webdoors/5013-colabore.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="lazyload">
            </picture>
            <img src="https://mapaosc.ipea.gov.br/cms/imagens/webdoors/1248-pagina-osc-atualizada.jpg" alt="Imagem sobre 2" title="Imagem sobre 2" width="100%" class="lazyload">
            <img src="https://mapaosc.ipea.gov.br/cms/imagens/webdoors/6202-bapi.jpg" alt="Imagem sobre 2" title="Imagem sobre 2" width="100%" class="lazyload">

        </div>--}}
    @if($rota=='/')
        <div class="owl-carousel owl-theme">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=1" data-src-retina="https://placehold.it/1180x250&text=1-retina" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=2" data-src-retina="https://placehold.it/1180x250&text=2-retina" alt="">
            <picture>
                <source class="owl-lazy" media="(min-width: 650px)" data-srcset="https://placehold.it/1180x250&text=3-large">
                <source class="owl-lazy" media="(min-width: 350px)" data-srcset="https://placehold.it/1180x250&text=3-medium">
                <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=3-fallback" alt="">
            </picture>
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=4" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=5" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=6" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=7" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=8" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=9" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=10" alt="">
            <img class="owl-lazy" data-src="https://placehold.it/1180x250&text=11" alt="">
        </div>
    @endif

</header>


