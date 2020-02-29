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
                            <label for="inputEmail4">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                        </div>
                        <div class="form-group col-md-10">
                            <label for="inputPassword4">Senha</label>
                            <input type="password" class="form-control" id="inputPassword4" placeholder="Senha">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Endereço</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="Rua dos Bobos, nº 0">
                    </div>
                    <div class="form-group">
                        <label for="inputAddress2">Endereço 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartamento, hotel, casa, etc.">
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">Cidade</label>
                            <input type="text" class="form-control" id="inputCity">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputEstado">Estado</label>
                            <select id="inputEstado" class="form-control">
                                <option selected>Escolher...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="form-group col-md-2">
                            <label for="inputCEP">CEP</label>
                            <input type="text" class="form-control" id="inputCEP">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck">
                            <label class="form-check-label" for="gridCheck">
                                Clique em mim
                            </label>
                        </div>
                    </div>

                    <div class="alert alert-secondary">
                        <i class="fas fa-database float-right tx-pri"></i>
                        <strong>Endereço:</strong><br>
                        Rua Capitão Silvio Conçalves de Farias, 981, Lote 02<br>
                        Bosque Ouro Preto do Oeste, Rondônia - RO<br>
                        <strong>CEP.:</strong> 76920000
                    </div>


                    <button type="submit" class="btn btn-primary">Entrar</button>
                </form>





                <div class="space"></div>

            </div>
            <div class="col-md-3">
                <div class="alert alert-secondary box-floating">
                   s
                </div>
            </div>
        </div>

    </div>


@endsection
