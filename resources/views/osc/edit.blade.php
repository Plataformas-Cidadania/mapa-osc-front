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

                <div class="alert alert-secondary box-floating">
                    <i class="fas fa-chevron-right menu-icons-close btn-menu-txt"></i>
                    <i class="fas fa-chevron-left menu-icons-close btn-menu-txt-show" style="display: none;"></i>
                    <ul class="menu-icons menu-right">
                        <li id="btn-right"></li>
                        <li><a href="detalhar/1#dados-gerais"><div><i class="far fa-file-alt"></i></div><p class="menu-icons-txt">Dados gerais</p></a></li>
                        <li><a href="detalhar/1#area-atuacao"><div><i class="fas fa-share-alt"></i></div><p class="menu-icons-txt">Área de atuação</p></a></li>
                        <li><a href="detalhar/1#descricao"><div><i class="fas fa-align-justify"></i></div><p class="menu-icons-txt">Descrição da OSC</p></a></li>
                        <li><a href="detalhar/1#titulacao"><div><i class="fas fa-certificate"></i></div><p class="menu-icons-txt">Titulações e Certificações</p></a></li>
                        <li><a href="detalhar/1#governanca"><div><i class="fas fa-briefcase"></i></div><p class="menu-icons-txt">Trabalho e Governança</p></a></li>
                        <li><a href="detalhar/1#participacao"><div><i class="fas fa-users"></i></div><p class="menu-icons-txt">Participação social</p></a></li>
                        <li><a href="detalhar/1#projetos"><div><i class="fas fa-project-diagram"></i></div><p class="menu-icons-txt">Projetos</p></a></li>
                        <li><a href="detalhar/1#fontes"><div><i class="fas fa-boxes"></i></div><p class="menu-icons-txt">Fontes de recursos</p></a></li>
                    </ul>
                    <i class="fas fa-times fa-2x float-right btn-right"></i>
                </div>

                <div class="row">
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
                        <div class="form-group col-md-4">
                            <label for="inputEstado">Situação do Imóvel</label>
                            <select id="inputEstado" class="form-control">
                                <option selected>Escolher...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
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
                            <li><img src="img/ods/01.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/02.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/03.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/04.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/05.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/06.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/07.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/08.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/09.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/10.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/11.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/12.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/13.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/14.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/15.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/16.png" alt="" class="item-off"></li>
                            <li><img src="img/ods/17.png" alt="" class="item-off"></li>
                        </ul>
                        <div>
                            <div>
                                <br>
                                <h3>1 - Acabar com a pobreza em todas as suas formas, em todos os lugares</h3>
                            </div>
                            <div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck">
                                        <label class="form-check-label" for="gridCheck">
                                            1.1 Até 2030, erradicar a pobreza extrema para todas as pessoas em todos os lugares, atualmente medida como pessoas vivendo com menos de US$ 1,25 por dia
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck2">
                                        <label class="form-check-label" for="gridCheck2">
                                            1.2 Até 2030, reduzir pelo menos à metade a proporção de homens, mulheres e crianças, de todas as idades, que vivem na pobreza, em todas as suas dimensões, de acordo com as definições nacionais
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck3">
                                        <label class="form-check-label" for="gridCheck3">
                                            1.3 Implementar, em nível nacional, medidas e sistemas de proteção social adequados, para todos, incluindo pisos, e até 2030 atingir a cobertura substancial dos pobres e vulneráveis
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck4">
                                        <label class="form-check-label" for="gridCheck4">
                                            1.4 Até 2030, garantir que todos os homens e mulheres, particularmente os pobres e vulneráveis, tenham direitos iguais aos recursos econômicos, bem como o acesso a serviços básicos, propriedade e controle sobre a terra e outras formas de propriedade, herança, recursos naturais, novas tecnologias apropriadas e serviços financeiros, incluindo microfinanças
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="gridCheck5">
                                        <label class="form-check-label" for="gridCheck5">
                                            1.5 Até 2030, construir a resiliência dos pobres e daqueles em situação de vulnerabilidade, e reduzir a exposição e vulnerabilidade destes a eventos extremos relacionados com o clima e outros choques e desastres econômicos, sociais e ambientais
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <br><br>
                            <div class="title-style">
                                <h2>Áreas e Subáreas de atuação da OSC</h2>
                                <div class="line line-fix"></div>
                                <hr/>
                            </div>
                            <div class="text-center">Atividade econômica (CNAE)</div>
                            <br>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="alert alert-secondary">
                                <h2 class="text-center">Área de atuação 1</h2>
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Busque um artigo...">
                                    <i class="fas fa-search"></i>
                                </div>
                                <div>
                                    <br>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="gridCheck">
                                            <label class="form-check-label" for="gridCheck">
                                                Educação infantil
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="gridCheck2">
                                            <label class="form-check-label" for="gridCheck2">
                                                Ensino médio
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="alert alert-secondary">
                                <h2 class="text-center">Área de atuação 2</h2>
                                <div class="input-icon">
                                    <input type="text" class="form-control" placeholder="Busque um artigo...">
                                    <i class="fas fa-search"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <br><br>
                            <div class="title-style">
                                <h2>Descrição da OSC</h2>
                                <div class="line line-fix"></div>
                                <hr/>
                            </div>
                            <br>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Entrar</button>
                </form>

                <div class="space"></div>

            </div>

        </div>

    </div>




@endsection
