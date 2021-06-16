<footer id="iniciodorodape" role="contentinfo" class="cel-footer d-print-none" >

    {{--CEL--}}
    <div class="menu-cel-footer bg-lgt menu-cel-login-hide" style="display: none;">
        <div class="text-center">
            <br>
            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle" width="80">
            <h4>Nome OSC</h4>
        </div>
        <hr>
        <div>
            <ul class="menu-cel-login">
                <li><a href=""><i class="far fa-address-card"></i> Minha Conta</a></li>
                <li><a href=""><i class="far fa-edit"></i> Editar OSC</a></li>
                <li><a href=""><i class="fas fa-puzzle-piece"></i> Colabore</a></li>
                <li class="float-right"><a><i class="fas fa-sign-out-alt"></i> Sair </a></li>
            </ul>
        </div>
    </div>
    {{--CEL--}}
    <div class="footer-cel d-block d-sm-none">
        <div class="container">
            <div class="row">
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    <p><a href="/">Ínicio</a></p>
                </div>
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <p><a href="/produtos">Mapa</a></p>
                </div>
                <div class="col-3 col-md-3 text-center">
                    <i class="fa fa-paper-plane"></i>
                    <p><a href="/contato">Contato</a></p>
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
        <div class="row rp-menu" >
            <div class="container">
                <br>
                <div class="row">
                    <div class="col-md-3">
                        <div>
                            <h3>O Portal</h3>
                            <ul>
                                @foreach($mnPortal as $mn)
                                <li><a href="{{$mn->slug}}">{{$mn->titulo}}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div>
                            <h3>Dados</h3>
                            <ul>
                                @foreach($mnDados as $mn)
                                    <li><a href="{{$mn->slug}}">{{$mn->titulo}}</a></li>
                                @endforeach
                                    <li role="presentation"><a href="posts/1/analises" accesskey="h" @if($rota=='/') class="corrente " @endif>Análises</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div>
                            <h3>Biblioteca</h3>
                            <ul>
                                <li><a href="posts/2/publicações">Publicações</a></li>
                                <li><a href="posts/3/noticias">Notícias</a></li>
                                <li><a href="editais">Editais</a></li>
                                <li><a href="videos">Vídeos</a></li>
                            </ul>
                        </div>
                    </div>

                    @if($setting->twitter!="" || $setting->youtube!="" || $setting->facebook!="" || $setting->pinterest!="")
                        <div class="col-md-3">
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

</footer>


