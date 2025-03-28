<footer id="iniciodorodape" role="contentinfo" class="cel-footer d-print-none" >

    {{--CEL--}}
    <div class="menu-cel-footer bg-lgt menu-cel-login-hide" style="display: none;">
        <div id="menu-usuario-mobile"></div>
    </div>
    {{--CEL--}}
    <div class="footer-cel d-block d-sm-none">
        <div class="container">
            <div class="row">
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <p><a href="/">Home</a></p>
                </div>
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <p><a href="mapa">Mapa</a></p>
                </div>
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-paper-plane"></i>
                    <p><a href="contato">Contato</a></p>
                </div>
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-user"></i>
                    <p><a id="btn-cel-login">Login</a></p>
                </div>
            </div>
        </div>
    </div>
    {{--CEL--}}

    <style>
        .menu-cel-footer{
            width: 100%;
            bottom:50px;
            position: fixed;
            padding: 6px 0 2px 0;
            border-top: solid 1px #CCCCCC;
            background-color: #FFFFFF;
            z-index: 9999999999;
        }
    </style>

    <div class="bg-lgt" style="position: relative;">
        {{----}}
        <div class="rp-menu" >
            <div class="container">
                <br>
                <div class="row">
                    <div class="col-md-2">
                        <div>
                            <h3>O Portal</h3>
                            <ul>
                                @foreach($mnPortal as $mn)
                                <li><a href="{{$mn->slug}}">{{$mn->titulo}}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div>
                            <h3><a href="mapa">Mapa</a></h3>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div>
                            <h3>Dados</h3>
                            <ul>
                                @foreach($mnDados as $mn)
                                    <li><a href="{{$mn->slug}}">{{$mn->titulo}}</a></li>
                                @endforeach
                                    <li role="presentation"><a href="indicadores" accesskey="h" @if($rota=='/') class="corrente " @endif>Indicadores</a></li>
                                    <li role="presentation"><a href="posts/1/analises" accesskey="h" @if($rota=='/') class="corrente " @endif>Análises</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div>
                            <h3>Biblioteca</h3>
                            <ul>
                                @foreach($midias as $midia)
                                    <li role="presentation"><a href="posts/{{$midia->id}}/{{clean($midia->titulo)}}" accesskey="q" @if($rota=='quem') class="corrente" @endif>{{$midia->titulo}}</a></li>
                                @endforeach
                                <li><a href="videos">Vídeos</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div>
                            <h3><a href="editais">Editais</a></h3>
                        </div>
                    </div>

                    @if($setting->twitter!="" || $setting->youtube!="" || $setting->facebook!="" || $setting->pinterest!="")
                        <div class="col-md-2">
                            <div>
                                <h3>Ajuda</h3>
                                <ul>
                                    @foreach($mnAjuda as $mn)
                                        <li><a href="{{$mn->slug}}">{{$mn->titulo}}</a></li>
                                    @endforeach
                                        <li role="presentation"><a href="contato" accesskey="a" @if($rota=='quem') class="contato" @endif>Fale conosco</a></li>
                                </ul>
                            </div>
                        </div>
                    @endif

                </div>
            </div>

        </div>
        <br>
        <br>
        <br>

        <div>
            <a href="#acessibilidade" class="link-to-menu bg-pri btn-circle rounded-circle">
                <p>Topo</p>
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
    </div>
    <div class="bg-pri">
        @if(env('APP_URL')!="http://mapa-osc-laravel.local/")
        <script defer="defer" src="//barra.brasil.gov.br/barra.js" type="text/javascript"></script>
        @endif
        <div id="footer-brasil"></div>
        <style>
            div#wrapper-barra-brasil {
                position: relative;
                margin: 0 auto;
                width: 100%;
                max-width: 1100px;
                height: 100%;
            }
        </style>
    </div>


</footer>


