@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <?php
        $txt_alert = "Não constam informações nas bases de dados do Mapa";
        $txt_alert_abb = "Não informado";
    ?>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$dados_gerais->tx_razao_social_osc}}</h1>
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

                {{--<div class="alert alert-secondary box-floating" style="float: right; right: 0; width: 300px">  VOLTAR MENU
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
                </div>--}}

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
                            <strong>CNPJ:</strong> {{$dados_gerais->cd_identificador_osc}}<br>
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

                    <div class="col-md-8">
                        <div class="item-detail">
                            <h4>Nome Fantasia:</h4>
                            <p>{{$dados_gerais->tx_nome_fantasia_osc == null ? "Não informado" : $dados_gerais->tx_nome_fantasia_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Sigla OSC:</h4>
                            <p>{{$dados_gerais->tx_sigla_osc == null ? "Não informado" : $dados_gerais->tx_sigla_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="alert alert-secondary">
                            <div class="row">
                                <div class="col-md-6">
                                    <i class="fas fa-database float-right tx-pri"></i>
                                    <strong>Endereço:</strong><br>
                                    {{$dados_gerais->tx_endereco == null ? "Não informado" : $dados_gerais->tx_endereco}}{{$dados_gerais->tx_endereco_complemento}}<br>
                                    {{$dados_gerais->tx_bairro}}, {{$dados_gerais->tx_nome_municipio}} - {{$dados_gerais->tx_sigla_uf}} <br>
                                    <strong>CEP.:</strong> {{$dados_gerais->nr_cep == null ? "Não informado" : $dados_gerais->nr_cep}}
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
                            <p>{{$dados_gerais->tx_nome_situacao_imovel_osc == null ? "Não informado" : $dados_gerais->tx_nome_situacao_imovel_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Responsável Legal:</h4>
                            <p>{{$dados_gerais->tx_nome_responsavel_legal == null ? "Não informado" : $dados_gerais->tx_nome_responsavel_legal}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Ano de Cadastro de CNPJ:</h4>
                            <p>{{$dados_gerais->dt_ano_cadastro_cnpj == null ? "Não informado" : $dados_gerais->dt_ano_cadastro_cnpj}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Ano de Fundação:</h4>
                            <p>{{$dados_gerais->dt_fundacao_osc == null ? "Não informado" : $dados_gerais->dt_fundacao_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="item-detail">
                            <h4>E-mail:</h4>
                            <p>{{$dados_gerais->tx_email == null ? "Não informado" : $dados_gerais->tx_email}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>O que a OSC faz:</h4>
                            <p>{{$dados_gerais->ft_resumo_osc == null ? "Não informado" : $dados_gerais->ft_resumo_osc}}</p>
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
                            <p>{{$dados_gerais->tx_nome_atividade_economica_osc == null ? "Não informado" : $dados_gerais->tx_nome_atividade_economica_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Área de Atuação 1:</h4>
                            <p>{{$area_atuacao->tx_nome_area_atuacao == null ? "Não informado" : $area_atuacao->tx_nome_area_atuacao}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Subárea:</h4>
                            <p>{{$area_atuacao->tx_nome_area_atuacao == null ? "Não informado" : $area_atuacao->tx_nome_area_atuacao}}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="item-detail">
                            <h4>Subárea:</h4>
                            <p>{{$area_atuacao->tx_nome_area_atuacao == null ? "Não informado" : $area_atuacao->tx_nome_area_atuacao}}</p>
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
                            <p>{{$descricao->tx_historico == null ? "Não informado" : $descricao->tx_historico}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Missão da OSC:</h4>
                            <p>{{$descricao->tx_missao_osc == null ? "Não informado" : $descricao->tx_missao_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Visão da OSC:</h4>
                            <p>{{$descricao->tx_visao_osc == null ? "Não informado" : $descricao->tx_visao_osc}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Finalidades Estatutárias da OSC:</h4>
                            <p>{{$descricao->tx_finalidades_estatutarias == null ? "Não informado" : $descricao->tx_finalidades_estatutarias}}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="item-detail">
                            <h4>Link para o Estatuto da OSC:</h4>
                            <p>{{$descricao->tx_link_estatuto_osc == null ? "Não informado" : $descricao->tx_link_estatuto_osc}}</p>
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
                    <?php $certificacoes = DB::connection('map')->table('portal.vw_osc_certificado')->where('id_osc', $id_osc)->get();?>
                    <table class="table">
                        <thead class="bg-pri text-light">
                        <tr>
                            <th scope="col">Titulo / Certificado</th>
                            <th scope="col">Início da validade</th>
                            <th scope="col">Fim da validade</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($certificacoes as $certificado)
                            <tr>
                                <td>{{$certificado->tx_nome_certificado}}</td>
                                <td>{{formatBr($certificado->dt_inicio_certificado, 'num')}}</td>
                                <td>{{formatBr($certificado->dt_fim_certificado, 'num')}}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
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
                    <div class="col-md-6">
                        <div class="bg-lgt box-itens">
                            <h3><strong>Quadro de Dirigentes</strong></h3>
                            <?php $governancas = DB::connection('map')->table('portal.vw_osc_governanca')->where('id_osc', $id_osc)->get();?>
                            <div>
                                @foreach($governancas as $governanca)
                                    <div>
                                        <p>{{$governanca->tx_cargo_dirigente}}</p>
                                        <p><strong>{{$governanca->tx_nome_dirigente}}</strong></p>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                        {{--<p>{{$relacoes_trabalho_governanca->governanca == null ? "Não informado" : $relacoes_trabalho_governanca->governanca}}</p>--}}
                    </div>
                    <div class="col-md-6">
                        <div class="bg-lgt box-itens">
                            <h3><strong>Conselho Fiscal</strong></h3>
                            <?php $conselhos_fiscais = DB::connection('map')->table('portal.vw_osc_conselho_fiscal')->where('id_osc', $id_osc)->get();?>
                            <div>
                                @foreach($conselhos_fiscais as $conselho_fiscal)
                                    <div>
                                        <p>{{$conselho_fiscal->tx_nome_conselheiro}}</p>
                                        <p><strong>{{$conselho_fiscal->tx_apelido_osc}}</strong></p>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                       {{-- <p>{{$relacoes_trabalho_governanca->conselho_fiscal == null ? "Não informado" : $relacoes_trabalho_governanca->conselho_fiscal}}</p>--}}
                    </div>
                    <div class="col-md-12">
                        <div class="row text-center">
                            <div class="col-md-12">
                                <br><br>
                                <strong>Trabalhadores</strong><br><br>
                            </div>

                            <div class="col-md-3">
                                <div class="bg-lgt box-itens">
                                    <h3>Total de Trabalhadores</h3>
                                    <div>
                                        @if($relacoes_trabalho_governanca->nr_trabalhadores != null)
                                            <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores}}</h2>
                                        @else
                                            <p class='not-info'>{{$txt_alert}}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-lgt box-itens">
                                    <h3>Empregados</h3>
                                    <div>
                                        @if($relacoes_trabalho_governanca->nr_trabalhadores_vinculo != null)
                                            <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_vinculo}}</h2>
                                        @else
                                            <p class='not-info'>{{$txt_alert}}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-lgt box-itens">
                                    <h3>Trabalhadores com deficiência</h3>
                                    <div>
                                        @if($relacoes_trabalho_governanca->nr_trabalhadores_deficiencia != null)
                                            <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_deficiencia}}</h2>
                                        @else
                                            <p class='not-info'>{{$txt_alert}}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-lgt box-itens">
                                    <h3>Trabalhadores voluntários</h3>
                                    <div>
                                        @if($relacoes_trabalho_governanca->nr_trabalhadores_voluntarios != null)
                                            <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_voluntarios}}</h2>
                                        @else
                                            <p class='not-info'>{{$txt_alert}}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>



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

    <style>
        .box-itens{
            padding: 20px 10px;
        }
        .box-itens h3{
            border-bottom: solid 1px #DEA33B;
            font-size: 14px;
            padding-bottom: 5px;
        }
        .box-itens h3 strong{
            font-size: 18px;
        }
        .box-itens h2{
            margin-top: 20px;
        }
        .box-itens p{
            font-size: 11px;
            font-weight: normal;
            line-height: 14px !important;
            margin-top: 20px;
        }
    </style>


@endsection
