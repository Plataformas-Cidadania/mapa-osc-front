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


    {{--<p>
        <a class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapse1 multiCollapse2">Alterna terceiro elemento</a>
    </p>
    <div class="row">
        <a  data-toggle="collapse" href="#multiCollapse1" role="button" aria-expanded="false" aria-controls="multiCollapse1">Alterna primeiro elemento</a>
        <div class="col-12">
            <div class="collapse multi-collapse show" id="multiCollapse1">
               aaa
            </div>
        </div>
        <a  type="button" data-toggle="collapse" data-target="#multiCollapse2" aria-expanded="false" aria-controls="multiCollapse2">Alterna segundo elemento</a>
        <div class="col-12">
            <div class="collapse multi-collapse show" id="multiCollapse2">
                bbb
            </div>
        </div>
    </div>--}}

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$dados_gerais->tx_razao_social_osc}}</h1>
                        <h5><a href="/">Home</a> / <a href="artigos">Artigos</a> / </h5>
                        <a onclick="window.print()"><i class="fas fa-print float-right"></i></a>
                        <a class=" float-right" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapse1 multiCollapse2 multiCollapse3 multiCollapse4 multiCollapse5 multiCollapse6 multiCollapse7 multiCollapse8"><i class="fas fa-sort-amount-down"></i>&nbsp;</a>
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

                {{--DADOS GERAIS--}}
                <div id="dados-gerais" class="row mn-accordion" data-toggle="collapse" href="#multiCollapse1" role="button" aria-expanded="false" aria-controls="multiCollapse1">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="far fa-file-alt"></i></div> Dados Gerais</h2>
                            <i class="fas fa-chevron-down float-right mn-accordion-arrow" ></i>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse1" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="img-upload">
                                <img src="https://www.serjaomotopecas.com.br/Assets/Produtos/Gigantes/noimage.gif" alt="">
                            </div>
                        </div>
                        <div class="col-md-9">
                            <p>
                                <strong>CNPJ:</strong> {{$dados_gerais->cd_identificador_osc}}<br>
                                <strong>Natureza Jurídica:</strong> <br>
                            </p>
                            <br>

                        </div>
                    </div>
                    <br><br>
                    <div class="row">

                        <div class="col-md-8">
                            <div class="item-detail">
                                <h4>Nome Fantasia:</h4>
                                <p>{{$dados_gerais->tx_nome_fantasia_osc == null ? $txt_alert_abb : $dados_gerais->tx_nome_fantasia_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Sigla OSC:</h4>
                                <p>{{$dados_gerais->tx_sigla_osc == null ? $txt_alert_abb : $dados_gerais->tx_sigla_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="alert alert-secondary">
                                <div class="row">
                                    <div class="col-md-6">
                                        <i class="fas fa-database float-right tx-pri"></i>
                                        <strong>Endereço:</strong><br>
                                        {{$dados_gerais->tx_endereco == null ? $txt_alert_abb : $dados_gerais->tx_endereco}}{{$dados_gerais->tx_endereco_complemento}}<br>
                                        {{$dados_gerais->tx_bairro}}, {{$dados_gerais->tx_nome_municipio}} - {{$dados_gerais->tx_sigla_uf}} <br>
                                        <strong>CEP.:</strong> {{$dados_gerais->nr_cep == null ? $txt_alert_abb : $dados_gerais->nr_cep}}<br><br>
                                        <i class="fas fa-phone-alt"></i> {{$dados_gerais->tx_telefone == null ? $txt_alert_abb : $dados_gerais->tx_telefone}}

                                        <div class="col-md-6 text-right fa-svg float-right">
                                            @if($dados_gerais->tx_email!=null)<a href="mailto:{{$dados_gerais->tx_email}}" target="_blank"><i class="far fa-envelope"></i></a>@endif
                                            @if($dados_gerais->tx_site!=null)<a href="http://{{$dados_gerais->tx_site}}" target="_blank"><i class="fas fa-globe"></i></a>@endif
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div id="mapPointOsc"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Situação do Imóvel:<i class="fas fa-database float-right tx-pri"></i></h4>
                                <p>{{$dados_gerais->tx_nome_situacao_imovel_osc == null ? $txt_alert_abb : $dados_gerais->tx_nome_situacao_imovel_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Responsável Legal:</h4>
                                <p>{{$dados_gerais->tx_nome_responsavel_legal == null ? $txt_alert_abb : $dados_gerais->tx_nome_responsavel_legal}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Ano de Cadastro de CNPJ:</h4>
                                <p>{{$dados_gerais->dt_ano_cadastro_cnpj == null ? $txt_alert_abb : formatBr($dados_gerais->dt_ano_cadastro_cnpj, 'num')}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Ano de Fundação:</h4>
                                <p>{{$dados_gerais->dt_fundacao_osc == null ? $txt_alert_abb : formatBr($dados_gerais->dt_fundacao_osc, 'num')}}</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="item-detail">
                                <h4>E-mail:</h4>
                                <p>{{$dados_gerais->tx_email == null ? $txt_alert_abb : $dados_gerais->tx_email}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>O que a OSC faz:</h4>
                                <p>{{$dados_gerais->ft_resumo_osc == null ? $txt_alert_abb : $dados_gerais->ft_resumo_osc}}</p>
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
                </div>

                {{--DAREA ATUACAO--}}
                <div class="row" id="area-atuacao" data-toggle="collapse" href="#multiCollapse2" role="button" aria-expanded="false" aria-controls="multiCollapse2">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-share-alt"></i></div> Áreas e Subáreas de Atuação da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse2" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Atividade Econômica (CNAE):</h4>
                                <p>{{$dados_gerais->tx_nome_atividade_economica_osc == null ? $txt_alert_abb : $dados_gerais->tx_nome_atividade_economica_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Área de Atuação 1:</h4>
                                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Subárea:</h4>
                                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="item-detail">
                                <h4>Subárea:</h4>
                                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {{--DESCRICAO--}}
                <div class="row" id="descricao"  data-toggle="collapse" href="#multiCollapse3" role="button" aria-expanded="false" aria-controls="multiCollapse3">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-align-justify"></i></div> Descrição da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse3" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Como surgiu a OSC:</h4>
                                <p>{{$descricao->tx_historico == null ? $txt_alert_abb : $descricao->tx_historico}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Missão da OSC:</h4>
                                <p>{{$descricao->tx_missao_osc == null ? $txt_alert_abb : $descricao->tx_missao_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Visão da OSC:</h4>
                                <p>{{$descricao->tx_visao_osc == null ? $txt_alert_abb : $descricao->tx_visao_osc}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Finalidades Estatutárias da OSC:</h4>
                                <p>{{$descricao->tx_finalidades_estatutarias == null ? $txt_alert_abb : $descricao->tx_finalidades_estatutarias}}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Link para o Estatuto da OSC:</h4>
                                <p>
                                    <a href="{{$descricao->tx_link_estatuto_osc}}" target="_blank">
                                        <div class="btn btn-primary">
                                            {{$descricao->tx_link_estatuto_osc == null ? $txt_alert_abb : 'Clique no link para ir ao Estatuto da OSC'}}
                                        </div>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {{--TITULACAO--}}
                <div class="row" id="titulacao"  data-toggle="collapse" href="#multiCollapse4" role="button" aria-expanded="false" aria-controls="multiCollapse4">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-certificate"></i></div> Titulações e Certificações</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse4" class="collapse multi-collapse show">
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

                {{--GOVERNANCA--}}
                <div class="row" id="governanca"  data-toggle="collapse" href="#multiCollapse5" role="button" aria-expanded="false" aria-controls="multiCollapse5">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-briefcase"></i></div> Relações de Trabalho e Governança</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse5" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="bg-lgt box-itens-g min-h">
                                <h2>Quadro de Dirigentes</h2>
                                <?php $governancas = DB::connection('map')->table('portal.vw_osc_governanca')->where('id_osc', $id_osc)->get();?>
                                @foreach($governancas as $governanca)
                                    <div>
                                        <p>{{$governanca->tx_cargo_dirigente}}</p>
                                        <p><strong>{{$governanca->tx_nome_dirigente}}</strong></p>
                                    </div>
                                @endforeach
                            </div>
                            {{--<p>{{$relacoes_trabalho_governanca->governanca == null ? $txt_alert_abb : $relacoes_trabalho_governanca->governanca}}</p>--}}
                        </div>
                        <div class="col-md-6">
                            <div class="bg-lgt box-itens-g min-h">
                                <h2>Conselho Fiscal</h2>
                                <?php $conselhos_fiscais = DB::connection('map')->table('portal.vw_osc_conselho_fiscal')->where('id_osc', $id_osc)->get();?>
                                @foreach($conselhos_fiscais as $conselho_fiscal)
                                    <div>
                                        <p>{{$conselho_fiscal->tx_nome_conselheiro}}</p>
                                    </div>
                                @endforeach
                            </div>
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
                </div>

                {{--PARTICIPACAO--}}
                <div class="row" id="participacao"  data-toggle="collapse" href="#multiCollapse6" role="button" aria-expanded="false" aria-controls="multiCollapse6">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-users"></i></div> Espaços de Participação Social</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse6" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box-itens-g">
                                <h2>Conselhos de Políticas Públicas</h2>
                                <?php $participacao_social_conselhos = DB::connection('map')->table('portal.vw_osc_participacao_social_conselho')->where('id_osc', $id_osc)->get();?>

                                @foreach($participacao_social_conselhos as $participacao_social_conselho)
                                    <div class="row bg-lgt">
                                        <div class="col-md-9">
                                            <br>
                                            <p><strong>Nome do Conselho:</strong></p>
                                            <p>{{$participacao_social_conselho->tx_nome_conselho}}</p>
                                        </div>
                                        <div class="col-md-3">
                                            <br class="d-none d-sm-block">
                                            <p><strong>Titularidade:</strong></p>
                                            <p>{{$participacao_social_conselho->tx_nome_tipo_participacao}}</p>
                                        </div>

                                        <?php $participacao_social_conselho_representantes = DB::connection('map')->table('portal.vw_osc_representante_conselho')->where('id_participacao_social_conselho', $participacao_social_conselho->id_conselho)->get();?>
                                        <div class="col-md-12">
                                            <p><strong>Nome de representante:</strong></p>
                                            @foreach($participacao_social_conselho_representantes as $participacao_social_conselho_representante)
                                                <p>{{$participacao_social_conselho_representante->tx_nome_representante_conselho}}</p>
                                            @endforeach
                                        </div>
                                        <div class="col-md-4 line-remove">
                                            <p><strong>Periodicidade da Reunião:</strong></p>
                                            <p>{{$participacao_social_conselho->tx_nome_periodicidade_reuniao_conselho}}</p>
                                        </div>
                                        <div class="col-md-4 line-remove">
                                            <p><strong>Data de início de vigência:</strong></p>
                                            <p>{{formatBr($participacao_social_conselho->dt_data_inicio_conselho, 'num')}}</p>
                                        </div>
                                        <div class="col-md-4 line-remove">
                                            <p><strong>Data de fim de vigência:</strong></p>
                                            <p>{{formatBr($participacao_social_conselho->dt_data_fim_conselho, 'num')}}</p>
                                        </div>
                                        <div class="col-md-12">

                                        </div>
                                    </div>
                                @endforeach
                            </div>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box-itens-g">
                                <h2>Conferências de Políticas Públicas</h2>
                                <?php $participacao_social_conferencia = DB::connection('map')->table('portal.vw_osc_participacao_social_conferencia')->where('id_osc', $id_osc)->get();?>
                                @foreach($participacao_social_conferencia as $participacao_social_conferencia)
                                    <div class="row bg-lgt">
                                        <div class="col-md-9">
                                            <br>
                                            <p><strong>Nome da Conferência:</strong></p>
                                            <p>{{$participacao_social_conferencia->tx_nome_conferencia}}</p>
                                        </div>
                                        <div class="col-md-3">
                                            <br class="d-none d-sm-block">
                                            <p><strong>Ano de realização da conferência:</strong></p>
                                            <p>{{formatBr($participacao_social_conferencia->dt_ano_realizacao, 'num')}}</p>
                                        </div>
                                        <div class="col-md-12">
                                            <p><strong>Forma de participação na conferência:</strong></p>
                                            <p>{{$participacao_social_conferencia->tx_nome_forma_participacao_conferencia}}</p>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box-itens-g">
                                <h2>Outros espaços de participação social</h2>
                                <?php $participacao_social_outros = DB::connection('map')->table('portal.vw_osc_participacao_social_outra')->where('id_osc', $id_osc)->get();?>
                                @foreach($participacao_social_outros as $participacao_social_outros)
                                    <div class="row bg-lgt">
                                        <div class="col-md-9">
                                            <br>
                                            <p><strong>Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:</strong></p>
                                            <p>{{$participacao_social_outros->tx_nome_participacao_social_outra}}</p>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>

                {{--PROJETOS--}}
                <div class="row" id="projetos"  data-toggle="collapse" href="#multiCollapse7" role="button" aria-expanded="false" aria-controls="multiCollapse7">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-project-diagram"></i></div> Projetos, atividades e/ou programas</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse7" class="collapse multi-collapse show">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="accordion" id="accordionProject">
                                @foreach($projetos as $key => $projeto)
                                    <?php
                                    $projetos_localizacao = DB::connection('map')->table('portal.vw_osc_localizacao_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_beneficiado = DB::connection('map')->table('portal.vw_osc_publico_beneficiado_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_recurso = DB::connection('map')->table('portal.vw_osc_fonte_recursos_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_parceira = DB::connection('map')->table('portal.vw_osc_parceira_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_financiador = DB::connection('map')->table('portal.vw_osc_financiador_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_tipo_parceria = DB::connection('map')->table('portal.vw_osc_tipo_parceria_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    $projetos_objetivo = DB::connection('map')->table('portal.vw_osc_objetivo_projeto')->where('id_projeto', $projeto->id_projeto)->get();
                                    ?>
                                    <div class="card">
                                        <div class="card-header" id="headingP{{$key}}">
                                            <div class="mb-0" data-toggle="collapse" data-target="#collapseP{{$key}}" aria-expanded="true" aria-controls="collapseP{{$key}}">
                                                {{$projeto->tx_nome_projeto}} <i class="fas fa-angle-down float-right"></i>
                                            </div>
                                        </div>
                                        <div id="collapseP{{$key}}" class="collapse @if($key===0) show @endif" aria-labelledby="headingP{{$key}}" data-parent="#accordionProject">
                                            <div class="card-body">
                                                <div class="row box-itens-m">
                                                    <div class="col-md-12 line-add">
                                                        <h2>Descrição do Projeto, atividade e/ou programa</h2>
                                                        <p>{{$projeto->tx_descricao_projeto}}</p>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Situação do Projeto</h2>
                                                            <p>{{$projeto->ft_status_projeto}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Ano de início</h2>
                                                            <p>{{formatBr($projeto->dt_data_inicio_projeto, 'num')}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Ano de conclusão:</h2>
                                                            <p>{{formatBr($projeto->dt_data_fim_projeto, 'num')}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Link para o projeto</h2>
                                                            <p>{{$projeto->tx_link_projeto}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Total de Beneficiários</h2>
                                                            <p>{{$projeto->nr_total_beneficiarios}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Valor Total</h2>
                                                            <p>{{"R$ ".number_format($projeto->nr_valor_total_projeto, 2, ',', '.')}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Valor Recebido</h2>
                                                            <p>{{"R$ ".number_format($projeto->nr_valor_captado_projeto, 2, ',', '.')}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Zona de Atuação</h2>
                                                            <p>{{$projeto->tx_nome_zona_atuacao}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="line-add">
                                                            <h2>Abrangência de atuação</h2>
                                                            <p>{{$projeto->tx_nome_abrangencia_projeto}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="row">
                                                            <div class="col-md-4">
                                                                <div class="line-add" >
                                                                    <div>
                                                                        <h2>Localização do Projeto</h2>
                                                                        @foreach($projetos_localizacao as $projeto_localizacao)
                                                                            <p>{{$projeto_localizacao->tx_nome_regiao_localizacao_projeto}}</p>
                                                                        @endforeach
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="line-add">
                                                                    <h2>Público Beneficiado</h2>
                                                                    @foreach($projetos_beneficiado as $projeto_beneficiado)
                                                                        <p>{{$projeto_beneficiado->tx_nome_publico_beneficiado}}</p>
                                                                    @endforeach
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="line-add">
                                                                    <h2>Tipo da Fontes de Recursos</h2>
                                                                    @foreach($projetos_recurso as $projeto_recurso)
                                                                        <p>{{$projeto_recurso->tx_nome_origem_fonte_recursos_projeto}}</p>
                                                                    @endforeach
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div class="col-md-6">
                                                        <div class="line-add">
                                                            <h2>OSCs Parceiras</h2>
                                                            @foreach($projetos_parceira as $projeto_parceira)
                                                                <p>{{$projeto_parceira->tx_nome_osc_parceira_projeto}}</p>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="line-add">
                                                            <h2>Financiadores do Projeto</h2>
                                                            @foreach($projetos_financiador as $projeto_financiador)
                                                                <p>{{$projeto_financiador->tx_nome_financiador}}</p>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div class="line-add">
                                                            <h2>Tipo de Parceria</h2>
                                                            @foreach($projetos_tipo_parceria as $projeto_tipo_parceria)
                                                                <p>{{$projeto_tipo_parceria->tx_nome_tipo_parceria}}</p>
                                                            @endforeach

                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="line-add">
                                                            <h2>Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa</h2>
                                                            <p>{{$projeto->tx_metodologia_monitoramento}}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="line-add">
                                                            <h2>Objetivos do Desenvolvimento Sustentável - ODS</h2>
                                                            @foreach($projetos_objetivo as $projeto_objetivo)
                                                                <p>{{$projeto_objetivo->tx_nome_objetivo_projeto}}</p>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="line-add">
                                                            <h2>Metas Relacionadas ao ODS</h2>
                                                            @foreach($projetos_objetivo as $projeto_objetivo)
                                                                <p>{{$projeto_objetivo->tx_nome_meta_projeto}}</p>
                                                            @endforeach
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                                <br>
                                <div>
                                    <p><strong>Total de recursos com projetos, atividades e/ou programas</strong></p>
                                    <p>{{"R$ ".number_format($projeto->nr_valor_total_projeto, 2, ',', '.')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {{--FONTES RECURSOS--}}
                <div class="row" id="fontesRecursos"  data-toggle="collapse" href="#multiCollapse8" role="button" aria-expanded="false" aria-controls="multiCollapse8">
                    <div class="col-md-12">
                        <br><br>
                        <div class="title-style">
                            <h2><div class="mn-accordion-icon"><i class="fas fa-boxes"></i></div> Fontes de recursos anuais da OSC</h2>
                            <div class="line line-fix"></div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div id="multiCollapse8" class="collapse multi-collapse show">
                    <div class="row">
                    <div class="col-md-12">
                        <div class="accordion" id="accordionExample">
                            @foreach($recursos as $key => $recurso)
                                <div class="card">
                                    <div class="card-header" id="heading{{$key}}">
                                        <div class="mb-0" data-toggle="collapse" data-target="#collapse{{$key}}" aria-expanded="true" aria-controls="collapse{{$key}}">
                                            {{$recurso->dt_ano_recursos_osc}} <i class="fas fa-angle-down float-right"></i>
                                        </div>
                                    </div>
                                    <div id="collapse{{$key}}" class="collapse @if($key===0) show @endif" aria-labelledby="heading{{$key}}" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="row">
                                                <?php $recursos_nome = DB::connection('map')->table('portal.vw_osc_recursos_osc')->select('tx_nome_origem_fonte_recursos_osc')->where('id_osc', $id_osc)->where('dt_ano_recursos_osc', $recurso->dt_ano_recursos_osc)->orderBy('tx_nome_origem_fonte_recursos_osc', 'desc')->distinct()->get();?>
                                                @foreach($recursos_nome as $key => $recurso_nome)
                                                    <?php $recursos_propios = DB::connection('map')->table('portal.vw_osc_recursos_osc')->where('id_osc', $id_osc)->where('dt_ano_recursos_osc', $recurso->dt_ano_recursos_osc)->where('tx_nome_origem_fonte_recursos_osc', $recurso_nome->tx_nome_origem_fonte_recursos_osc)->get();?>
                                                    <div class="col-md-12">
                                                        <h2 class="bg-pri text-light title-mp">{{$recurso_nome->tx_nome_origem_fonte_recursos_osc}}</h2>
                                                    </div>
                                                        @foreach($recursos_propios as $key => $recurso_propio)
                                                            <div class="col-md-4">
                                                                <div class="line-items line-add">
                                                                    <p>{{$recurso_propio->tx_nome_fonte_recursos_osc}}</p>
                                                                    <h2>{{"R$ ".number_format($recurso_propio->nr_valor_recursos_osc, 2, ',', '.')}}</h2>
                                                                </div>
                                                            </div>
                                                        @endforeach
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                </div>
                <br>
            </div>

        </div>

    </div>

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
            /*width: 200px;*/
        }
        .menu-icons-h li{
            display: inline!important;
        }
        .menu-icons-h svg{
            width: 30px!important;
            height: 30px!important;
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


        .box-itens-g{
            padding: 20px 20px;
        }
        .box-itens-g div{
            border-bottom: solid 1px #E6E6E6;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
        .box-itens-g div:last-child{
            border-bottom: 0;
            margin-bottom: 0;
            padding-bottom: 10px;
        }
        .box-itens-g h2{
            border-bottom: solid 1px #DEA33B;
            font-size: 18px;
            padding-bottom: 5px;
            text-align: center;
        }
        .box-itens-g p{
            font-size: 16px;
            margin: 0;
            padding: 0;
        }
        .box-itens-g strong{
            font-size: 12px;
            margin: 0;
        }


        .title-mp{
            padding: 0 10px;
            font-size: 16px;
        }
        .min-h {
            min-height: 400px;
        }
        .line-remove{
            border-bottom: 0!important;
            margin-bottom: 0!important;
            padding-bottom: 0!important;
        }
        .line-add{
            border-bottom: solid 1px #E6E6E6;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
        .line-items p{
            min-height: 40px;
            font-size: 14px;
            line-height: 16px;
            margin: 0;
        }

        .box-itens-m h2{
            font-size: 16px;
            padding: 0;
            margin: 0;
        }
        .box-bg{
            padding: 10px;
            margin-bottom: 10px;
            min-height: 250px;
        }

        #mapPointOsc {
            width: 100%;
            height: 195px;
        }




        .mn-accordion{
            cursor: pointer;
        }
        .mn-accordion-icon {
            border: solid 4px #1b4b72;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            float: left;
            text-align: center;
            line-height: 38px;
            margin: -6px 10px 0 0;
            color: #DEA33B;
        }
        .mn-accordion .mn-accordion-arrow{
            margin-top: -20px
        }
    </style>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>

<script>
    var map = L.map('mapPointOsc').setView([{{$dados_gerais->geo_lat}}, {{$dados_gerais->geo_lng}}], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([{{$dados_gerais->geo_lat}}, {{$dados_gerais->geo_lng}}]).addTo(map)
        .bindPopup('{{$dados_gerais->tx_razao_social_osc}}')
        /*.openPopup();*/
</script>



@endsection
