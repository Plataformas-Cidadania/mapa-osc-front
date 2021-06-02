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
        <div class="col-md-5">
            <p>
                <strong>CNPJ:</strong> {{$dados_gerais->cd_identificador_osc}}<br>
                <strong>Natureza Jurídica:</strong> {{$dados_gerais->tx_nome_natureza_juridica_osc}}<br>
            </p>
            <br>
        </div>
        <div class="col-md-4">
            <div id="preenchimento"></div>
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
                <p>{{$dados_gerais->dt_ano_cadastro_cnpj == null ? $txt_alert_abb : formatBr($dados_gerais->dt_ano_cadastro_cnpj, 'y')}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Ano de Fundação:</h4>
                <p>{{$dados_gerais->dt_fundacao_osc == null ? $txt_alert_abb : formatBr($dados_gerais->dt_fundacao_osc, 'y')}}</p>
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
                <p>{{$dados_gerais->ft_resumo_osc == null ? $txt_alert_abb : $dados_gerais->tx_resumo_osc}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail alert alert-secondary" >
                <h4>Objetivos do Desenvolvimento Sustentável - ODS:</h4>
                <br>
                <div class="item-obj">
                    @foreach($objetivos_osc as $objetivo_osc)
                        <div class="col-md-12">
                            @if($objetivo_osc->cd_objetivo_osc <= 10)
                                <img src="img/ods/0{{$objetivo_osc->cd_objetivo_osc}}.png" alt="">
                                <br>
                            @else
                                <img src="img/ods/{{$objetivo_osc->cd_objetivo_osc}}.png" alt="">
                                <br>
                            @endif

                            <h3><strong class="objetivo_color{{$objetivo_osc->cd_objetivo_osc}}">{{$objetivo_title[$objetivo_osc->cd_objetivo_osc]}}</strong></h3>
                            <p>{{substr($objetivo_osc->tx_nome_objetivo_osc, 2, -1)}}</p>
                        </div>
                        <br>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Metas Relacionadas ao ODS:</h4>
                                @foreach($objetivo_osc->objetivo_metas as $objetivo_meta)
                                    <p>{{$objetivo_meta->tx_nome_meta_osc}}</p>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                    <br><br>
                </div>

            </div>
        </div>


        <br><br>

    </div>
</div>
