<div id="barra-brasil" style="background:#7F7F7F; height: 20px; padding:0 0 0 10px;display:block;">
    <ul id="menu-barra-temp" style="list-style:none;">
        <li style="display:inline; float:left;padding-right:10px; margin-right:10px; border-right:1px solid #EDEDED">
            <a href="http://brasil.gov.br" style="font-family:sans,sans-serif; text-decoration:none; color:white;">Portal do Governo Brasileiro</a>
        </li>
    </ul>
</div>

<div class="progress">
    <div  id="progress" class="progress-bar bg-success" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<div class="bg-lgt d-print-none" id="acessibilidade" >
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <ul id="atalhos" class="top-links">
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodoconteudo" accesskey="1">Ir para o Conteúdo [1]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodomenu" accesskey="2">Ir para o Menu [2]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#search" accesskey="3">Ir para a busca [3]</a></li>
                    <li><a href="<?php if($rota != '/'){?>{{$rota}}<?php }?>#iniciodorodape" accesskey="4" class="link-to-menu">Ir para o rodapé [4]</a></li>
                </ul>
            </div>
            <div class="col-md-2 col-sm-6 col-xs-6 text-lg-right text-md-right top-ipea">
                <a href="https://www.ipea.gov.br" target="_blank" alt="Link externo para o IPEA." title="Link externo para o IPEA."><img src="img/logo-ipea.png" width="150"/></a>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-6 text-lg-right text-md-right top-icons" style="display: flex">
                <ul id="botoes" >
                    <li class="bg-pri box-font-size rounded-circle cursor"><a id="aumenta_fonte" {{--onClick="fonte('a');"--}}>A+</a></li>
                    <li class="bg-sec box-font-size rounded-circle cursor"><a id="reset_fonte">A&nbsp;</a></li>
                    <li class="bg-ter box-font-size rounded-circle cursor"><a id="reduz_fonte">A-</a></li>
                    <li><a class="btn-constrat cursor"><i class="fas fa-adjust fa-2x" style="vertical-align: middle;"></i> {{--Alto contraste--}}</a></li>
                    <li><a href="acessibilidade"><i class="fas fa-universal-access fa-2x" style="vertical-align: middle;"></i> <!--Acessibilidade--></a></li>
                </ul>

                <a href="javascript:trocarIdioma('pt')" style="margin-right: 3px"><img alt="português" src="img/pt.jpg"></a>
                <a href="javascript:trocarIdioma('es')" style="margin-right: 3px"><img alt="espanhol" src="img/es.jpg"></a>
                <a href="javascript:trocarIdioma('en')" style="margin-right: 3px"><img alt="ingles" src="img/en.jpg"></a>
            </div>
        </div>
    </div>
</div>
{{--///////////////////////////////////////////////////////////////////////--}}
<div id="google_translate_element" class="boxTradutor"></div>

<script type="text/javascript">
    var comboGoogleTradutor = null; //Varialvel global

    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'pt',
            includedLanguages: 'en,es,pt',
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
        }, 'google_translate_element');

        comboGoogleTradutor = document.getElementById("google_translate_element").querySelector(".goog-te-combo");
    }

    function changeEvent(el) {
        if (el.fireEvent) {
            el.fireEvent('onchange');
        } else {
            var evObj = document.createEvent("HTMLEvents");

            evObj.initEvent("change", false, true);
            el.dispatchEvent(evObj);
        }
    }

    function trocarIdioma(sigla) {
        if (comboGoogleTradutor) {
            comboGoogleTradutor.value = sigla;
            changeEvent(comboGoogleTradutor);//Dispara a troca
        }
    }
</script>
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<style type="text/css">
    #google_translate_element {
        display: none;
    }

    .skiptranslate {
        display: none !important;
    }
    .goog-te-banner-frame {
        display: none !important;
    }
    body {
        position: static !important;
        top: 0 !important;
    }

</style>
{{--///////////////////////////////////////////////////////////////////////--}}


<script>
    (function (){
        'use strict';

        var btnSetItem = document.querySelector('.btn-constrat')

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
            })

        }

        setLocalStorage();


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
                <picture>
                    <source srcset="imagens/settings/{{$setting->imagem}}" media="(max-width: 468px)">
                    <source srcset="imagens/settings/{{$setting->imagem}}" class="img-responsive">
                    <img src="img/pre-img.gif" srcset="imagens/settings/{{$setting->imagem}}" alt="{{$setting->titulo}}" title="{{$setting->titulo}}" width="240" style="margin-left: 30px;">
                </picture>
            </a>
        </div>
        <div class="col-xs-2"></div>
    </div>
</div>

<div class="menu-cel hidden-lg hidden-md hidden-sm menu-cel-hide" style="display: none;" id="iniciodomenu">
    <?php /*?>
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
 <?php */?>
    <ul>
        <br>
<!--        <li role="presentation"><a href="" @if($rota=='/') class="corrente" @endif>Home</a></li>-->
        <li role="presentation"><a href="sobre" @if($rota=='sobre') class="corrente" @endif>O Portal</a></li>
        <li role="presentation"><a href="mapa" @if($rota=='mapa') class="corrente" @endif>Mapa</a></li>

        <li role="presentation"><a @if($rota=='quem') class="corrente" @endif>Dados</a></li>
        <li role="presentation"><a href="base-dados" @if($rota=='quem') class="corrente" @endif>&nbsp;&nbsp;&nbsp;Base de Dados</a></li>
        <li role="presentation"><a href="indicadores" @if($rota=='/') class="corrente " @endif>&nbsp;&nbsp;&nbsp;Indicadores</a></li>
        <li role="presentation"><a href="posts/1/analises" @if($rota=='/') class="corrente " @endif>&nbsp;&nbsp;&nbsp;Análises</a></li>

        <li role="presentation"><a @if($rota=='quem') class="corrente" @endif>Biblioteca</a></li>
        <li role="presentation"><a href="posts/3/analises" @if($rota=='quem') class="corrente" @endif>&nbsp;&nbsp;&nbsp;Análises</a></li>
        <li role="presentation"><a href="posts/2/noticias" @if($rota=='quem') class="corrente" @endif>&nbsp;&nbsp;&nbsp;Notícias</a></li>
        <li role="presentation"><a href="videos" @if($rota=='quem') class="corrente" @endif>&nbsp;&nbsp;&nbsp;Vídeos</a></li>
        <li role="presentation"><a href="editais" @if($rota=='quem') class="corrente" @endif>Editais</a></li>



        <li role="presentation"><a href="glossario"  @if($rota=='contato') class="corrente" @endif>Ajuda</a></li>
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
                        <picture>
                            <source srcset="imagens/settings/{{$setting->imagem}}" media="(max-width: 468px)">
                            <source srcset="imagens/settings/{{$setting->imagem}}" class="img-responsive">
                            <img src="img/pre-img.gif" srcset="imagens/settings/{{$setting->imagem}}" alt="{{$setting->titulo}}" title="{{$setting->titulo}}"  width="300">
                        </picture>
                    </a>
                    <div>
                        <br>
                        <div class="btn-group">
                            <ul id="menu-desk">
<!--                                <li role="presentation"><a href="" accesskey="h" @if($rota=='/') class="corrente" @endif>Home</a></li>-->
                                <li role="presentation"><a href="sobre" accesskey="q" @if($rota=='sobre') class="corrente" @endif>O Portal</a>
                                    <ul class="noJS menu-desk-sub">
                                        @foreach($mnPortal as $portal)
                                            <li role="presentation"><a href="/{{clean($portal->slug)}}" @if($rota=='quem') class="corrente" @endif>{{$portal->titulo}}</a></li>
                                        @endforeach
                                    </ul>
                                </li>
                                <li role="presentation"><a href="mapa" a @if($rota=='mapa') class="corrente" @endif>Mapa</a></li>
                                <li role="presentation"><a @if($rota=='contato') class="corrente" @endif>Dados</a>
                                    <ul class="noJS menu-desk-sub">
                                        <li role="presentation"><a href="base-dados" @if($rota=='quem') class="corrente" @endif>Base de Dados</a></li>
                                        <li role="presentation"><a href="indicadores" @if($rota=='/') class="corrente " @endif>Indicadores</a></li>
                                        <li role="presentation"><a href="posts/1/analises"  @if($rota=='/') class="corrente " @endif>Análises</a></li>
                                    </ul>
                                </li>
                                <li role="presentation"><a  @if($rota=='quem') class="corrente" @endif>Biblioteca</a>
                                    <ul class="noJS menu-desk-sub">
                                        @foreach($midias as $midia)
                                            <li role="presentation"><a href="posts/{{$midia->id}}/{{clean($midia->titulo)}}" @if($rota=='quem') class="corrente" @endif>{{$midia->titulo}}</a></li>
                                        @endforeach
                                        <li role="presentation"><a href="videos" @if($rota=='quem') class="corrente" @endif>Vídeos</a></li>
                                    </ul>
                                </li>

                                <li role="presentation"><a href="editais" @if($rota=='quem') class="corrente" @endif>Editais</a></li>

                                <li role="presentation"><a @if($rota=='contato') class="corrente" @endif>Ajuda</a>
                                    <ul class="noJS menu-desk-sub">
                                        @foreach($mnAjuda as $ajuda)
                                            <li role="presentation"><a href="{{$ajuda->slug}}">{{$ajuda->titulo}}</a></li>
                                        @endforeach
                                        <li role="presentation"><a href="contato" accesskey="c" @if($rota=='quem') class="contato" @endif>Fale conosco</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <div id="menu-usuario"></div>
                            <!--<div class="login" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <div class="login-icon rounded-circle">
                                    <i class="far fa-user"></i>
                                </div>
                                <p>Olá, faça seu login ou se cadastre-se</p>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a href="login"><button class="btn btn-primary btn-login-menu" type="button">Entrar</button></a>
                                <a href="register"><button class="dropdown-item" type="button">Cadastre-se</button></a>
                                <a href="register"><button class="dropdown-item" type="button">Estado e Município</button></a>
                                <a href="oscs-user"><button class="dropdown-item" type="button">Minha OSCs</button></a>
                                <a href="oscs-user"><button class="dropdown-item " type="button">Editar</button></a>
                                <a href="logout-user"><button class="dropdown-item" type="button">Sair</button></a>
                            </div>-->
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>

<style>
    .btn-login-menu{
        width: 90%;
        border-radius: 2px;
        margin: 0 5px 8px 8px;
    }

    .owl-prev, .owl-next{
        opacity: 0.5;
    }
</style>

    @if($rota=='/')
        <div class="owl-carousel owl-theme">
            @foreach($webdoors as $webdoor)
                <a href="{{$webdoor->link}}">
                    <picture>
                        <source class="owl-lazy" media="(min-width: 350px)" data-srcset="imagens/webdoors/lg-{{$webdoor->imagem}}">
                        <source class="owl-lazy" media="(min-width: 650px)" data-srcset="imagens/webdoors/md-{{$webdoor->imagem}}">
                        <img class="owl-lazy" data-src="imagens/webdoors/lg-{{$webdoor->imagem}}" alt="">
                    </picture>
                </a>
            @endforeach

        </div>
    @endif




</header>
