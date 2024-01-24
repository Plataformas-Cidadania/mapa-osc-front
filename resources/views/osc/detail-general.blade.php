<script>
    id_osc = {{$id_osc}};
</script>

<div id="dados-gerais" class="row mn-accordion" data-toggle="collapse" href="#multiCollapse1" role="button" aria-expanded="false" aria-controls="multiCollapse1">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="far fa-file-alt"></i></div> Dados gerais </h2>
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
                    if(substr($cabecalho->im_logo, 0, 10)=='data:image'){
                        $logo =  $cabecalho->im_logo;
                    }else{
                        $api = env('APP_API_ROUTE');
                        if(env('LOCALHOST_DOCKER') == 1){
                            $api = env('HOST_DOCKER')."api/";
                        }
                        $pagina = $api."osc/logo/".$id_osc;
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
                    if($logo==""){
                        $logo = "img/sem-imagem.png";
                    }
                ?>
                <img src="{{$logo}}" alt="{{$cabecalho->tx_razao_social_osc}}" title="{{$cabecalho->tx_razao_social_osc}}">
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
                <strong>CNPJ:</strong> {{$cabecalho->cd_identificador_osc}}<br>
                <strong>Natureza jurídica:</strong> {{$cabecalho->tx_nome_natureza_juridica_osc}}<br>
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
                <h4>Nome fantasia:</h4>
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
                <h4>Situação do imóvel:<i class="fas fa-database float-right tx-pri"></i></h4>
                <p>{{$dados_gerais->tx_nome_situacao_imovel_osc == null ? $txt_alert_abb : $dados_gerais->tx_nome_situacao_imovel_osc}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Responsável legal:</h4>
                <p>{{$dados_gerais->tx_nome_responsavel_legal == null ? $txt_alert_abb : $dados_gerais->tx_nome_responsavel_legal}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Ano de cadastro de CNPJ:</h4>
                <p>{{$dados_gerais->dt_ano_cadastro_cnpj == null ? $txt_alert_abb : formatBr($dados_gerais->dt_ano_cadastro_cnpj, 'y')}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Ano de fundação:</h4>
                <p>{{$dados_gerais->dt_fundacao_osc == null ? $txt_alert_abb : formatBr($dados_gerais->dt_fundacao_osc, 'y')}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>E-mail:</h4>
                <p>{{$dados_gerais->tx_email == null ? $txt_alert_abb : $dados_gerais->tx_email}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Site oficial:</h4>
                <p>{{$dados_gerais->tx_site == null ? $txt_alert_abb : $dados_gerais->tx_site}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail">
                <h4>O que a OSC faz:</h4>
                <p>{{$dados_gerais->tx_resumo_osc == null ? $txt_alert_abb : $dados_gerais->tx_resumo_osc}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail alert alert-secondary" >
                <h4>Objetivos do Desenvolvimento Sustentável - ODS:</h4>
                <br>
                <div class="item-obj">

                    <?php
                        $objetivos = [];

                        foreach ($objetivos_osc as $item) {
                            $cdObjetivo = $item->meta_projeto->cd_objetivo_projeto;
                            if(array_search($cdObjetivo, array_column($objetivos, 'cd_objetivo_projeto')) === false){
                                $nome_objetivo = $item->meta_projeto->objetivo_projeto->tx_nome_objetivo_projeto;
                                array_push($objetivos, ['cd_objetivo_projeto' => $cdObjetivo, 'tx_nome_objetivo_projeto' => $nome_objetivo, 'metas' => []]);
                            }
                            $key = array_search($cdObjetivo, array_column($objetivos, 'cd_objetivo_projeto'));
                            array_push($objetivos[$key]['metas'], [
                                'cd_meta_projeto' => $item->meta_projeto->cd_meta_projeto,
                                'tx_nome_meta_projeto' => $item->meta_projeto->tx_nome_meta_projeto,
                            ]);
                        }
                    ?>
                    @foreach($objetivos as $objetivo)
                        <div class="col-md-12">
                            @if($objetivo['cd_objetivo_projeto'] <= 10)
                                <img src="img/ods/0{{$objetivo['cd_objetivo_projeto']}}.png" alt="">
                                <br>
                            @else
                                <img src="img/ods/{{$objetivo['cd_objetivo_projeto']}}.png" alt="">
                                <br>
                            @endif
                            <h3><strong class="objetivo_color{{$objetivo['cd_objetivo_projeto']}}">{{$objetivo_title[$objetivo['cd_objetivo_projeto']]}}</strong></h3>
                            <p>{{$objetivo['tx_nome_objetivo_projeto']}}</p>
                            <div style="clear: both;"></div>
                        </div>
                        <br>
                        <div class="col-md-12">
                            <div class="item-detail">
                                <h4>Metas relacionadas ao ODS:</h4>
                                @foreach($objetivo['metas'] as $meta)
                                    <p>{{$objetivo['cd_objetivo_projeto']}}.{{$meta['cd_meta_projeto']}}. {{$meta['tx_nome_meta_projeto']}}</p>
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
