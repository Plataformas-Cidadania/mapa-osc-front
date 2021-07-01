<script>
    id_osc = {{$dados_gerais->id_osc}};
</script>
<div id="dados-gerais" class="row mn-accordion" data-toggle="collapse" href="#multiCollapse1" role="button" aria-expanded="false" aria-controls="multiCollapse1">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="far fa-file-alt"></i></div> Dados Gerais </h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" title="Fechar ou abrir grupo Dados Gerais" ></i>
            <a class=" float-right" type="button" data-toggle="collapse" title="Fechar ou abrir todos os grupos" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapse1 multiCollapse2 multiCollapse3 multiCollapse4 multiCollapse5 multiCollapse6 multiCollapse7 multiCollapse8" style="float: left; margin-top: -23px; margin-right: 25px"><i class="fas fa-sort-amount-down"></i>&nbsp;</a>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse1" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-3">
            <div class="img-upload">
                <?php
                    $logo = "img/sem-imagem.png";
                    if($dados_gerais->im_logo!=""){
                        $logo =  $dados_gerais->im_logo;
                    }else{
                        $pagina = env('APP_API_ROUTE')."osc/logo/".$dados_gerais->id_osc;
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $pagina);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                        $logo = curl_exec($ch);
                        $error = curl_error($ch);
                        curl_close($ch);
                        $logo = substr($logo, 1);
                        $logo = substr($logo, 0, -1);
                        $logo = str_replace("\\", "", $logo);
                    }

                ?>


                <img src="{{$logo}}" alt="{{$dados_gerais->tx_nome_natureza_juridica_osc}}" title="{{$dados_gerais->tx_nome_natureza_juridica_osc}}">
                <br><br>
            </div>
            <a href="metodologia">
                <div id="selo"></div>
            </a>

            <a href="https://gife.org.br/indicadores-gife-de-governanca/autoavaliacao/" target="_blank">
                <img src="img/gife.png" alt="" width="80" style="margin-left: 20px;">
            </a>
        </div>
        <div class="col-md-5">
            <p>
                <strong>CNPJ:</strong> {{$dados_gerais->cd_identificador_osc}}<br>
                <strong>Natureza Jurídica:</strong> {{$dados_gerais->tx_nome_natureza_juridica_osc}}<br>
            </p>
            <br>
        </div>
        <div class="col-md-4 text-center">
            <p>Índice de preenchimento</p>
            <div id="preenchimento"></div>
            <p class="text-center btn btn-outline-primary btn-sm" style="position: relative; z-index: 9999; margin-top: -30px;"><a href="/metodologia">Metodologia</a></p>
        </div>
    </div>

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
                            @if($dados_gerais->tx_email!=null)<a href="mailto:{{$dados_gerais->tx_email}}" target="_blank" title="E-mail de contato"><i class="far fa-envelope"></i></a>@endif
                            @if($dados_gerais->tx_site!=null)<a href="http://{{$dados_gerais->tx_site}}" target="_blank" title="Acesse o website"><i class="fas fa-globe"></i></a>@endif
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
