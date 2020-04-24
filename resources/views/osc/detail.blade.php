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


    <div class="container">
        <div class="row">
            <div class="col-md-12">

                <div class="alert alert-secondary box-floating" style="float: right; right: 0; width: 300px">
                    <ul class="menu-icons">
                        <li><i class="fas fa-times float-right"></i></li>
                        <li><div><i class="far fa-file-alt"></i></div> <p><a href="detalhar/1#dados-gerais">Dados gerais</a></p></li>
                        <li><div><i class="fas fa-share-alt"></i></div> <p><a href="detalhar/1#area-atuacao">Área de atuação</a></p></li>
                        <li><div><i class="fas fa-align-justify"></i></div> <p><a href="detalhar/1#descricao">Descrição da OSC</a></p></li>
                        <li><div><i class="fas fa-certificate"></i></div> <p><a href="detalhar/1#titulacao">Titulações e Certificações</a></p></li>
                        <li><div><i class="fas fa-briefcase"></i></div> <p><a href="detalhar/1#governanca">Trabalho e Governança</a></p></li>
                        <li><div><i class="fas fa-users"></i></div> <p><a href="detalhar/1#participacao">Participação social</a></p></li>
                        <li><div><i class="fas fa-project-diagram"></i></div> <p><a href="detalhar/1#projetos">Projetos</a></p></li>
                        <li><div><i class="fas fa-boxes"></i></div> <p><a href="detalhar/1#fontes">Fontes de recursos</a></p></li>
                    </ul>
                </div>

                <div class="row" id="dados-gerais">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Dados Gerais</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <div class="img-upload">
                            <img src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif" alt="">
                        </div>
                    </div>
                    <div class="col-md-9">
                        <ul class="menu-icons menu-icons-h float-right">
                            <li><div><i class="far fa-envelope"></i></div> </li>
                            <li><div><i class="fas fa-globe"></i></div> </li>
                            <li><div><i class="fab fa-facebook-f"></i></div> </li>
                        </ul>


                        <br>
                        <p>
                            <strong>CNPJ:</strong> <br>
                            <strong>Natureza Jurídica:</strong> <br>
                        </p>
                        <br>

                    </div>
                </div>

                <br><br>
                <style>
                    .item-detail{
                        border-bottom: solid 1px #CCCCCC;
                        margin-bottom: 20px;
                    }
                    .item-detail h4{
                        font-weight: bold;
                        margin: 0;
                    }
                    .item-detail p{
                    }
                    .item-detail svg{
                        margin-top: 5px;
                    }
                    .menu-icons-h{
                       width: 200px;
                    }
                    .menu-icons-h li{
                        display: inline!important;
                    }
                    .item-obj img{
                        float: left;
                        margin-right: 10px;
                    }
                    .item-obj h3{
                        color: #E5243B;
                    }
                    .item-obj p{
                        margin-top: -5px;
                    }
                </style>

                <div class="row">

                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Nome Fantasia:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Sigla OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="alert alert-secondary">
                            <div class="row">
                                <div class="col-md-6">
                                    <i class="fas fa-database float-right tx-pri"></i>
                                    <strong>Endereço:</strong><br>
                                    Rua Capitão Silvio Conçalves de Farias, 981, Lote 02<br>
                                    Bosque Ouro Preto do Oeste, Rondônia - RO<br>
                                    <strong>CEP.:</strong> 76920-000
                                </div>
                                <div class="col-md-6">
                                    <img src="https://docs.mapbox.com/ios/assets/maps-examples-add-marker-symbol-960-4c2d0dcb2896da516c138d37b09f923e.webp" alt="" width="100%">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Situação do Imóvel:<i class="fas fa-database float-right tx-pri"></i></h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Responsável Legal:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Ano de Cadastro de CNPJ:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Ano de Fundação:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>O que a OSC faz:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>E-mail:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail alert alert-secondary">
                            <h4>Objetivos do Desenvolvimento Sustentável - ODSSite Externo:</h4>
                            <br>
                            <div class="item-obj">
                                <img src="img/ods/01.png" alt="">
                                <h3><strong>Erradicação da Pobreza</strong></h3>
                                <p>Acabar com a pobreza em todas as suas formas, em todos os lugares</p>
                                <br><br>
                            </div>
                            <p>2. Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável</p>
                            <p>3. Acabar com a fome, alcançar a segurança alimentar e melhoria da nutrição e promover a agricultura sustentável</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Metas Relacionadas ao ODS:</h4>
                            <p>2.3 Até 2030, dobrar a produtividade agrícola e a renda dos pequenos produtores de alimentos, particularmente das mulheres, povos indígenas, agricultores familiares, pastores e pescadores, inclusive por meio de acesso seguro e igual à terra, outros recursos produtivos e insumos, conhecimento, serviços financeiros, mercados e oportunidades de agregação de valor e de emprego não agrícola</p>
                            <p>2.4 Até 2030, garantir sistemas sustentáveis de produção de alimentos e implementar práticas agrícolas resilientes, que aumentem a produtividade e a produção, que ajudem a manter os ecossistemas, que fortaleçam a capacidade de adaptação às mudanças climáticas, às condições meteorológicas extremas, secas, inundações e outros desastres, e que melhorem progressivamente a qualidade da terra e do solo</p>
                        </div>
                    </div>

                    <br><br>

                </div>


                <div class="row" id="area-atuacao">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Áreas e Subáreas de Atuação da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Atividade Econômica (CNAE):</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Área de Atuação 1:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Subárea:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Subárea:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                </div>


                <div class="row" id="descricao">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Descrição da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Como surgiu a OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Missão da OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Visão da OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="item-detail">
                            <h4>Finalidades Estatutárias da OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="item-detail">
                            <h4>Link para o Estatuto da OSC:</h4>
                            <p>Não informado</p>
                        </div>
                    </div>
                </div>


                <div class="row" id="titulacao">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Titulações e Certificações</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="item-detail"><strong>Utilidade Pública Municipal -</strong><span></span></p>
                    <p class="item-detail"><strong>Utilidade Pública Estadual -</strong><span></span></p>
                    <p class="item-detail"><strong>Utilidade Pública Estadual -</strong><span></span></p>

                </div>

                <div class="row" id="governanca">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Relações de Trabalho e Governança</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <strong>Quadro de Dirigentes</strong><br><br>
                        <p>Presidente: Flávia Hermínia Vieira Lopes</p>
                        <p>Presidente: Flávia Hermínia Vieira Lopes</p>
                        <p>Presidente: Flávia Hermínia Vieira Lopes</p>
                        <p>Presidente: Flávia Hermínia Vieira Lopes</p>
                    </div>
                    <div class="col-md-4">
                        <strong>Conselho Fiscal</strong>
                    </div>
                    <div class="col-md-4">
                        <strong>Trabalhadores</strong>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2>Áreas e Subáreas de Atuação da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                    <p class="item-detail"><strong></strong><span></span></p>
                </div>

            </div>

        </div>

    </div>




@endsection
