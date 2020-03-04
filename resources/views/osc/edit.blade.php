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
                        <h1>Organização da Sociedade Civil de Teste do Mapa das OSCs</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> / </h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>
    <style>
        label{
            font-size: 13px;
            margin-bottom: 0;
        }
        .img-upload img{
            border-radius: 50%;
            width: 150px;
            height: 150px;
            border: solid 4px #CCCCCC;
        }
        .img-upload-i{
            border-radius: 50%;
            width: 50px;
            height: 50px;
            border: solid 1px #CCCCCC;
            position: absolute;
            line-height: 50px;
            text-align: center;
            font-size: 30px;
            background-color: #FFFFFF;
            margin-top: -50px;
            margin-left: 110px;
        }
        .box-floating{
            position: fixed;
        }
    </style>

    <div class="container">
        <div class="row">
            <div class="col-md-9">

                <div class="row">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style colo-lgt">
                            <h2>Dados Gerais</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>

                <br><br>

                <div class="row">
                    <div class="col-md-3">
                        <div class="img-upload">
                            <img src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif" alt="">
                            <div class="img-upload-i"><i class="fas fa-image tx-pri"></i></div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <br>
                        <p>
                            <strong>Área de atuação:</strong> <br>
                            <strong>CNPJ:</strong> <br>
                            <strong>Natureza Jurídica:</strong> <br>
                        </p>
                    </div>
                </div>



                <br><br>



                <form>
                    <div class="form-row">
                        <div class="form-group col-md-2">
                            <label for="inputEmail4">Sigla da OSC</label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="form-group col-md-10">
                            <label for="inputPassword4">Nome Fantasia</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Senha">
                        </div>
                    </div>

                    <div class="alert alert-secondary">
                        <i class="fas fa-database float-right tx-pri"></i>
                        <strong>Endereço:</strong><br>
                        Rua Capitão Silvio Conçalves de Farias, 981, Lote 02<br>
                        Bosque Ouro Preto do Oeste, Rondônia - RO<br>
                        <strong>CEP.:</strong> 76920000
                    </div>


                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="inputEstado">Situação do Imóvel</label>
                            <select id="inputEstado" class="form-control">
                                <option selected>Escolher...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="inputAddress2">Ano de inscrição no Cadastro de CNPJ</label>
                            <input type="date" class="form-control" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc.">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputCity">Ano de Fundação</label>
                            <input type="date" class="form-control" id="inputCity">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputAddress">Responsável Legal</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">E-mail oficial da OSC</label>
                            <input type="emil" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Site</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Senha">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputEmail4">Telefone</label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputPassword4">Celular</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Senha">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">O que a OSC faz</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>

                    <h4>Objetivos do Desenvolvimento Sustentável - ODS</h4>

                    <div>
                        <ul class="menu-txt-icon">
                            <li><img src="/img/ods/01.png" alt=""></li>
                            <li><img src="/img/ods/02.png" alt=""></li>
                            <li><img src="/img/ods/03.png" alt=""></li>
                            <li><img src="/img/ods/04.png" alt=""></li>
                            <li><img src="/img/ods/05.png" alt=""></li>
                            <li><img src="/img/ods/06.png" alt=""></li>
                            <li><img src="/img/ods/07.png" alt=""></li>
                            <li><img src="/img/ods/08.png" alt=""></li>
                            <li><img src="/img/ods/09.png" alt=""></li>
                            <li><img src="/img/ods/10.png" alt=""></li>
                            <li><img src="/img/ods/11.png" alt=""></li>
                            <li><img src="/img/ods/12.png" alt=""></li>
                            <li><img src="/img/ods/13.png" alt=""></li>
                            <li><img src="/img/ods/14.png" alt=""></li>
                            <li><img src="/img/ods/15.png" alt=""></li>
                            <li><img src="/img/ods/16.png" alt=""></li>
                            <li><img src="/img/ods/17.png" alt=""></li>
                        </ul>
                    </div>

                    <style>
                        .menu-txt-icon{
                            margin: 0;
                            padding: 0;
                        }
                        .menu-txt-icon li{
                            display: inline-block;
                            margin-bottom: 5px;
                        }
                        /*.menu-txt-icon li{
                            width: 120px;
                            height: 120px;
                            margin: 2px;
                            background-color: #CCCCCC;
                            font-size: 9px;
                            display: inline-block;
                            padding: 5px;
                        }
                        .menu-txt-icon li span:first-child{
                            font-size: 22px;
                        }*/
                    </style>


                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck">
                            <label class="form-check-label" for="gridCheck">
                                Clique em mim
                            </label>
                        </div>
                    </div>


                    <button type="submit" class="btn btn-primary">Entrar</button>
                </form>





                <div class="space"></div>

            </div>
            <div class="col-md-3">
                <div class="alert alert-secondary box-floating">
                   <ul class="menu-icons">
                       <li><i class="fas fa-times float-right"></i></li>
                       <li><div><i class="far fa-file-alt"></i></div> <p>Dados gerais</p></li>
                       <li><div><i class="fas fa-share-alt"></i></div> <p>Área de atuação</p></li>
                       <li><div><i class="fas fa-align-justify"></i></div> <p>Descrição da OSC</p></li>
                       <li><div><i class="fas fa-certificate"></i></div> <p>Titulações e Certificações</p></li>
                       <li><div><i class="fas fa-briefcase"></i></div> <p>Releções de trabalho e Governança</p></li>
                       <li><div><i class="fas fa-users"></i></div> <p>Participação social</p></li>
                       <li><div><i class="fas fa-project-diagram"></i></div> <p>Projetos</p></li>
                       <li><div><i class="fas fa-boxes"></i></div> <p>Fontes de recursos</p></li>
                   </ul>
                </div>
            </div>
        </div>

    </div>

    <style>
        .menu-icons{
            margin: 0;
            padding: 0;
        }
        .menu-icons li{
            display: inline-block;
            width: 100%;
            padding: 6px 0 0 0;
            border-bottom: solid 1px #CCCCCC;
        }
        .menu-icons li:first-child{
            border-bottom: 0;
            margin-top: -10px;
        }
        .menu-icons li:last-child{
            border-bottom: 0;
        }
        .menu-icons div{
            background-color: #1b4b72;
            border-radius: 50%;
            padding: 4px;
            width: 45px;
            height: 45px;
            float: left;
            text-align: center;
            margin: 0 10px 0 0;
        }
        .menu-icons div svg{
            color: #FFFFFF;
            padding: 5px;
            font-size: 35px;
            margin-top: 2px;
        }
        .menu-icons p{
            padding: 12px 0 0 0;
        }
    </style>


@endsection
