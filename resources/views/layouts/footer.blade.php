<footer id="iniciodorodape" role="contentinfo" class="cel-footer">

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
                            <h3>Mapa das OSCs</h3>
                            <ul>
                                <li><a href="filtros-series/">Metodologia</a></li>
                                <li><a href="filtros-series/">Termos de Uso</a></li>
                                <li><a href="filtros-series/">Cadastro de Representante</a></li>
                                <li><a href="filtros-series/">Contato e Sugestões</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div>
                            <h3>Ajuda</h3>
                            <ul>
                                <li><a href="contato">Glossário</a></li>
                                <li><a href="noticias">Perguntas Frequentes</a></li>
                                <li><a href="artigos/0/todos">Tutoriais</a></li>
                                <li><a href="videos">Mapa do Site</a></li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div>
                            <h3>Ipea</h3>
                            <ul>
                                <li><a href="contato">Portal dos Convênios</a></li>
                                <li><a href="contato">Atlas da Vulnerabilidade Social</a></li>
                                <li><a href="contato">Extrator de Dados do Ipea</a></li>
                                <li><a href="contato">Participação em Foco</a></li>
                            </ul>
                        </div>
                    </div>

                    @if($setting->twitter!="" || $setting->youtube!="" || $setting->facebook!="" || $setting->pinterest!="")
                        <div class="col-md-3">
                            <div>
                                <h3>Redes</h3>
                                <ul>
                                    @if($setting->twitter!="")<li><a href="{{$setting->twitter}}" target="_blank">Twitter</a></li>@endif
                                    @if($setting->youtube!="")<li><a href="{{$setting->youtube}}" target="_blank">YouTube</a></li>@endif
                                    @if($setting->facebook!="")<li><a href="{{$setting->facebook}}" target="_blank">Facebook</a></li>@endif
                                    @if($setting->pinterest!="")<li><a href="{{$setting->pinterest}}" target="_blank">Pinterest</a></li>@endif
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
        {{----}}
        <div>
            <a href="#acessibilidade" class="link-to-menu bg-pri btn-circle rounded-circle">
                <p>Top</p>
                <i class="fas fa-angle-up"></i>
            </a>
        </div>
    </div>




    <style>
        .rp-menu{
            padding: 30px 0;
        }
        .rp-menu .col-md-3{
            border-left: dotted 1px #999;
        }
        .rp-menu ul{
            margin: 0;
            padding: 0;
        }
        .rp-menu ul{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .rp-menu h3{
            font-weight: bold;
        }
        .btn-circle{
            float: right;
            width: 60px;
            height: 60px;
            color: #FFFFFF!important;
            text-align: center;
            margin: 20px;
            position: absolute;
            bottom: 0;
            right: 0;
        }
        .btn-circle:hover{
            transform: scale(1.1);
            /*border: solid 5px rgba(0,0,0, 0.1);*/
            box-shadow: 0 0 3px #000000;
        }
        .btn-circle p{
            margin: 10px 0 -5px 0;
            padding: 0;
        }
    </style>
</footer>


