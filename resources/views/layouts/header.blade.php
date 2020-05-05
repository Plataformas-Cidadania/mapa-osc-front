<div class="progress">
    <div  id="progress" class="progress-bar bg-success" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<div class="bg-lgt" id="acessibilidade" >
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <ul id="atalhos">
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodoconteudo" accesskey="1">Ir para o Conteúdo [1]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodomenu" accesskey="2">Ir para o Menu [2]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#busca" accesskey="3">Ir para a busca [3]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodorodape" accesskey="4" class="link-to-menu">Ir para o rodapé [4]</a></li>
                </ul>
            </div>
            <div class="col-md-6 text-lg-right text-md-right">
                <ul id="botoes" >
                    <li class="bg-pri box-font-size rounded-circle"><a id="aumenta_fonte" {{--onClick="fonte('a');"--}} href="#">A+</a></li>
                    <li class="bg-sec box-font-size rounded-circle"><a id="reset_fonte" href="#">A&nbsp;</a></li>
                    <li class="bg-ter box-font-size rounded-circle"><a id="reduz_fonte" href="#">A-</a></li>
                    <li><a href="#" class="btn-constrat"><i class="fas fa-adjust fa-2x" style="vertical-align: middle;"></i> Alto contraste</a></li>
                    <li><a href="acessibilidade"><i class="fas fa-universal-access fa-2x" style="vertical-align: middle;"></i> Acessibilidade</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

{{--<span class="btnSetItem"><i class="fas fa-adjust"></i></span>
<span class="btnGetItem">Pegar Item</span>
<span class="btnRemoveItem">Remover Item</span>--}}
<script>
    (function (){
        'use strict';

        var btnSetItem = document.querySelector('.btn-constrat')
        //var btnGetItem = document.querySelector('.btn-constrat')
        //var btnRemoveItem = document.querySelector('.btnRemoveItem')

        function setLocalStorage(){

            if(localStorage.getItem('contrast')==='true'){
                document.getElementById('contrast').className = 'contrast';
            }else{
                document.getElementById('contrast').className = 'contrast-off';
            }

            btnSetItem.addEventListener('click', () => {
                if(localStorage.getItem('contrast')==='true'){
                    localStorage.setItem('contrast', false);
                    document.getElementById('contrast').className = 'contrast-off';
                }else{
                    localStorage.setItem('contrast', true);
                    document.getElementById('contrast').className = 'contrast';
                }
                //console.log(localStorage.getItem('contrast'));
            })

            //console.log(localStorage.getItem('contrast'));
           }

        /*function getLocalStorage(){
            btnGetItem.addEventListener('click', () => {
                console.log( localStorage.getItem('contrast') )
            })
        }

        function removeLocalStorage(){
            btnRemoveItem.addEventListener('click', () => {
                localStorage.removeItem('contrast')
            })
        }*/
        setLocalStorage();
        /*getLocalStorage();
        removeLocalStorage();*/

    }());
</script>

<style>
    .box-font-size{
        width: 25px;
        height: 25px;
        color: #FFFFFF;
        cursor: pointer;
        text-align: center;
        padding-top: -1px;
    }
    .box-font-size a{
        display: block;
    }
</style>

{{--CEl--}}
<div class="header-cel text-center d-block d-sm-none" >
    <div class="row">
        <div class="col-xs-2">
            <i class="fas fa-bars fa-2x btn-cel menu-cel-icon"></i>
            <i class="fas fa-times fa-2x btn-cel menu-cel-hide"></i>
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

<div class="menu-cel hidden-lg hidden-md hidden-sm menu-cel-hide" style="display: none;">
    <div class="menu-cel-redes">
        {{--@if($setting->pinterest!="")<a href="{{$setting->pinterest}}" target="_blank"><i class="fab fa-pinterest-square font-color" aria-hidden="true"></i></a>@endif
        @if($setting->instagram!="")<a href="{{$setting->instagram}}" target="_blank"><i class="fab fa-instagram font-color" aria-hidden="true"></i></a>@endif
        @if($setting->twitter!="")<a href="{{$setting->twitter}}" target="_blank"><i class="fab fa-twitter font-color" aria-hidden="true"></i></a>@endif
        @if($setting->youtube!="")<a href="{{$setting->youtube}}" target="_blank"><i class="fab fa-youtube-square font-color" aria-hidden="true"></i></a>@endif
        @if($setting->blog!="")<a href="{{$setting->blog}}" target="_blank"><i class="fab fa-blogger font-color" aria-hidden="true"></i></a>@endif
        @if($setting->facebook!="")<a href="{{$setting->facebook}}" target="_blank"><i class="fab fa-facebook-square font-color" aria-hidden="true"></i></a>@endif--}}
        <i class="fab fa-facebook-square"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-whatsapp"></i>
        <hr class="hr-cel">
    </div>
    <ul>
        <li><a href="/">Ínicio</a></li>
        <li><a href="sobre">Sobre</a></li>
        <li><a href="mapa">Mapa</a></li>
        <li><a href="contato">Contato</a></li>
    </ul>
</div>
<div class="box-menu menu-cel-hide" style="display: none;"></div>
{{--CEl--}}



<header id="iniciodoconteudo"  role="banner">

    <div class="container d-none d-xl-block d-sm-block">
        <div class="row">
            <div class="col-md-12">
                <nav class="navbar navbar-light">
                    <a class="navbar-brand" href="#">
                        Logo site
                    </a>
                    <div>
                        <br>
                        <div class="btn-group">
                            <ul id="menu-desk">
                                <li role="presentation"><a href="/" accesskey="h" @if($rota=='/') class="corrente" @endif>Home</a></li>
                                <li role="presentation"><a href="sobre" accesskey="q" @if($rota=='sobre') class="corrente" @endif>Sobre</a></li>
                                <li role="presentation"><a href="mapa" a @if($rota=='mapa') class="corrente" @endif>Mapa</a></li>
                                <li role="presentation"><a href="artigos" accesskey="a" @if($rota=='quem') class="corrente" @endif>Artigos</a></li>
                                <li role="presentation"><a href="videos" accesskey="a" @if($rota=='quem') class="corrente" @endif>Vídeos</a></li>
                                <li role="presentation"><a href="contato" accesskey="c" @if($rota=='contato') class="corrente" @endif>Contato</a>
                                    <ul id="menu-desk" class="noJS">
                                        <li role="presentation"><a href="http://localhost/mapa-osc-laravel/" accesskey="h" @if($rota=='/') class="corrente" @endif>Home</a></li>
                                        <li role="presentation"><a href="quem" accesskey="q" @if($rota=='quem') class="corrente" @endif>Sobre</a></li>
                                        <li role="presentation"><a href="artigos" accesskey="artigos" @if($rota=='quem') class="corrente" @endif>Artigos</a></li>
                                        <li role="presentation"><a href="contato" accesskey="c" @if($rota=='contato') class="corrente" @endif>Contato</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <div class="login" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="login-icon rounded-circle">
                                    <i class="far fa-user"></i>
                                </div>
                                <p>Olá, faça seu login ou se cadastre-se</p>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                                <button class="dropdown-item" type="button">Configurar conta</button>
                                <button class="dropdown-item " type="button"><a href="editar-osc">Editar</a></button>
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
