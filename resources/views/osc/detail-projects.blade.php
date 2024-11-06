<div class="row" id="projetos"  data-toggle="collapse" href="#multiCollapse7" role="button" aria-expanded="false" aria-controls="multiCollapse7">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-project-diagram"></i></div> Projetos, atividades e/ou programas</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Projetos, atividades e/ou programas"></i>
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

                    $projetos_descricao = curl('projeto', $projeto->id);
                    $projetos_localizacao = curl('projeto/localizacoes', $projeto->id);
                    $projetos_beneficiado = curl('projeto/publicos', $projeto->id);
                    $projetos_recurso = curl('projeto/recursos', $projeto->id);
                    $projetos_parceira = curl('projeto/parceiras', $projeto->id);
                    $projetos_financiador = curl('projeto/financiadores', $projeto->id);
                    $projetos_tipo_parceria = curl('projeto/tipo_parcerias', $projeto->id);
                    $projetos_objetivo = curlList('projeto/objetivos', $projeto->id);

                    ?>
                    <div class="card">
                        <div class="card-header" id="headingP{{$key}}">
                            <div class="mb-0" data-toggle="collapse" data-target="#collapseP{{$key}}" aria-expanded="true" aria-controls="collapseP{{$key}}">
                                {{$projeto->titulo}} <i class="fas fa-angle-down float-right" style="margin: 0 10px"></i> <?php echo iconType($projetos_descricao->ft_nome_projeto, 18); ?>
                            </div>
                        </div>

                        <div id="collapseP{{$key}}" class="collapse @if($key===0) show @endif" aria-labelledby="headingP{{$key}}" data-parent="#accordionProject">
                            <div class="card-body">
                                <div class="row box-itens-m">
                                    <!--////////////////////////////////////////////-->
                                    <div class="col-md-12 line-add">
                                        <?php echo iconType($projetos_descricao->ft_descricao_projeto); ?>
                                        <h2>Descrição do projeto, atividade e/ou programa</h2>
                                        <p>{{$projetos_descricao->tx_descricao_projeto == null ? $txt_alert_abb : $projetos_descricao->tx_descricao_projeto}}</p>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                            <?php echo iconType($projetos_descricao->ft_status_projeto); ?>
                                            <h2>Situação do projeto</h2>
                                            <p>{{$projetos_descricao->cd_status_projeto == null ? $txt_alert_abb : $projetos_descricao->cd_status_projeto}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_data_inicio_projeto); ?>
                                            <h2>Ano de início</h2>
                                            <p>{{$projetos_descricao->dt_data_inicio_projeto == null ? $txt_alert_abb : formatBr($projetos_descricao->dt_data_inicio_projeto, 'num')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_data_fim_projeto); ?>
                                            <h2>Ano de conclusão:</h2>
                                            <p>{{$projetos_descricao->dt_data_fim_projeto == null ? $txt_alert_abb : formatBr($projetos_descricao->dt_data_fim_projeto, 'num')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_link_projeto); ?>
                                            <h2>Link para o projeto</h2>
                                            <p><a href="{{$projetos_descricao->tx_link_projeto == null ? $txt_alert_abb : $projetos_descricao->tx_link_projeto}}" class="btn btn-outline-primary" target="_blank">Clique aqui</a></p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_total_beneficiarios); ?>
                                            <h2>Total de beneficiários</h2>
                                            <p>{{$projetos_descricao->nr_total_beneficiarios == null ? $txt_alert_abb : $projetos_descricao->nr_total_beneficiarios}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_valor_total_projeto); ?>
                                            <h2>Valor total</h2>
                                            <p>{{$projetos_descricao->nr_valor_total_projeto == null ? $txt_alert_abb : "R$ ".number_format($projetos_descricao->nr_valor_total_projeto, 2, ',', '.')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_valor_captado_projeto); ?>
                                            <h2>Valor recebido</h2>
                                            <p>{{$projetos_descricao->nr_valor_captado_projeto == null ? $txt_alert_abb : "R$ ".number_format($projetos_descricao->nr_valor_captado_projeto, 2, ',', '.')}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_zona_atuacao_projeto); ?>
                                            <h2>Zona de atuação</h2>
                                            <p>{{$projetos_descricao->cd_zona_atuacao_projeto == null ? $txt_alert_abb : $zonaAtuacao[$projetos_descricao->cd_zona_atuacao_projeto]}}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="line-add">
                                                <?php echo iconType($projetos_descricao->ft_abrangencia_projeto); ?>
                                            <h2>Abrangência de atuação</h2>
                                            <p>{{$projetos_descricao->cd_abrangencia_projeto == null ? $txt_alert_abb : $abrangencia[$projetos_descricao->cd_abrangencia_projeto]}}</p>
                                        </div>
                                    </div>
                                    <!--////////////////////////////////////////////-->

                                    <div class="col-md-12">
                                        <div class="row">

                                            <div class="col-md-4">
                                                <div class="line-add line-add-h" >
                                                    <div>
                                                        <h2>Localização do projeto</h2>
                                                        @if(empty($projetos_localizacao))
                                                            {{$txt_alert_abb}}
                                                        @else
                                                            <ul>
                                                            @foreach($projetos_localizacao as $projeto_localizacao)
                                                                <li>{{$projeto_localizacao->tx_nome_regiao_localizacao_projeto}} <?php echo iconType($projeto_localizacao->ft_nome_regiao_localizacao_projeto); ?></li>
                                                            @endforeach
                                                            </ul>
                                                        @endif
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <div class="line-add line-add-h">
                                                    <h2>Público beneficiado</h2>
                                                    @if(empty($projetos_beneficiado))
                                                        {{$txt_alert_abb}}
                                                    @else
                                                        <ul>
                                                        @foreach($projetos_beneficiado as $projeto_beneficiado)
                                                            <li>{{$projeto_beneficiado->tx_nome_publico_beneficiado}} <?php echo iconType($projeto_beneficiado->ft_nome_publico_beneficiado); ?></li>
                                                        @endforeach
                                                         </ul>
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="line-add line-add-h">
                                                    <h2>Tipo da fontes de recursos</h2>
                                                    @if(empty($projetos_recurso))
                                                        {{$txt_alert_abb}}
                                                    @else
                                                        <ul>
                                                        @foreach($projetos_recurso as $projeto_recurso)
                                                            <li>{{$projeto_recurso->dc_origem_fonte_recursos_projeto->tx_nome_origem_fonte_recursos_projeto}} <?php  echo iconType($projeto_recurso->ft_fonte_recursos_projeto); ?></li>
                                                        @endforeach
                                                        </ul>
                                                    @endif
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="line-add line-add-h">
                                            <h2>OSCs parceiras</h2>
                                            @if(empty($projetos_parceira))
                                                {{$txt_alert_abb}}
                                            @else
                                                <ul>
                                                    @foreach($projetos_parceira as $projeto_parceira)
                                                        <li>{{$projeto_parceira->tx_nome_fantasia_osc}}  <?php echo iconType($projeto_parceira->ft_osc_parceira_projeto); ?></li>
                                                    @endforeach
                                                </ul>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="line-add line-add-h">
                                            <h2>Financiadores do projeto</h2>
                                            @if(empty($projetos_financiador))
                                                {{$txt_alert_abb}}
                                            @else
                                                <ul>
                                                    @foreach($projetos_financiador as $projeto_financiador)
                                                        <li>{{$projeto_financiador->tx_nome_financiador}} <?php  echo iconType($projeto_financiador->ft_nome_financiador);?></li>
                                                    @endforeach
                                                </ul>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="line-add line-add-h">
                                            <h2>Tipo de Parceria</h2>
                                            @if(empty($projetos_tipo_parceria))
                                                {{$txt_alert_abb}}
                                            @else
                                                <ul>
                                                    @foreach($projetos_tipo_parceria as $projeto_tipo_parceria)
                                                        <li>{{$projeto_tipo_parceria->dc_tipo_parceria->tx_nome_tipo_parceria}} <?php  echo iconType($projeto_tipo_parceria->ft_tipo_parceria_projeto);?></li>
                                                    @endforeach
                                                </ul>
                                            @endif
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="line-add">
                                            <h2>Metodologia de Monitoramento e Avaliação do Projeto, atividade e/ou programa <?php  echo iconType($projetos_descricao->ft_metodologia_monitoramento);?></h2>
                                            <p>{{$projetos_descricao->tx_metodologia_monitoramento == null ? $txt_alert_abb : $projetos_descricao->tx_metodologia_monitoramento}}</p>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="item-detail alert alert-secondary" >
                                            <h4>Objetivos do Desenvolvimento Sustentável - ODS:</h4>
                                            @if(empty($projetos_objetivo))
                                                {{$txt_alert_abb}}
                                            @else
                                                <br>
                                                <div class="item-obj">
                                                    <?php
                                                    $objetivos_projeto = [];

                                                    foreach ($projetos_objetivo as $item) {
                                                        $cdObjetivo = $item->meta_projeto->cd_objetivo_projeto;
                                                        if(array_search($cdObjetivo, array_column($objetivos_projeto, 'cd_objetivo_projeto')) === false){
                                                            $nome_objetivo = $item->meta_projeto->objetivo_projeto->tx_nome_objetivo_projeto;
                                                            array_push($objetivos_projeto, ['cd_objetivo_projeto' => $cdObjetivo, 'tx_nome_objetivo_projeto' => $nome_objetivo, 'metas' => []]);
                                                        }
                                                        $key = array_search($cdObjetivo, array_column($objetivos_projeto, 'cd_objetivo_projeto'));
                                                        array_push($objetivos_projeto[$key]['metas'], [
                                                            'cd_meta_projeto' => $item->meta_projeto->cd_meta_projeto,
                                                            'tx_nome_meta_projeto' => $item->meta_projeto->tx_nome_meta_projeto,
                                                        ]);
                                                    }
                                                    ?>
                                                    @foreach($objetivos_projeto as $objetivo)
                                                        <div class="col-md-12">
                                                                <?php echo iconType($projetos_objetivo[0]->ft_objetivo_projeto, 20);?>
                                                            @if($objetivo['cd_objetivo_projeto'] <= 10)
                                                                <img src="img/ods/0{{$objetivo['cd_objetivo_projeto']}}.png" alt="">
                                                                <br>
                                                            @else
                                                                <img src="img/ods/{{$objetivo['cd_objetivo_projeto']}}.png" alt="">
                                                                <br>
                                                            @endif
                                                            <h3><strong class="objetivo_color{{$objetivo['cd_objetivo_projeto']}}">{{$objetivo_title[$objetivo['cd_objetivo_projeto']]}}</strong></h3>
                                                            <p>{{$objetivo['tx_nome_objetivo_projeto']}}
                                                               {{-- {{print_r($objetivo)}}--}}

                                                            </p>
                                                            <div style="clear: both;"></div>
                                                        </div>
                                                        <br>
                                                        <div class="col-md-12">
                                                            <div class="item-detail">
                                                                <h4>Metas Relacionadas ao ODS:</h4>
                                                                @foreach($objetivo['metas'] as $meta)
                                                                    <p>{{$objetivo['cd_objetivo_projeto']}}.{{$meta['cd_meta_projeto']}}. {{$meta['tx_nome_meta_projeto']}}<?php  //print_r($meta)//echo iconType($objetivo['ft_objetivo_projeto']);?></p>
                                                                    {{--{{print_r($meta)}}--}}
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    @endforeach
                                                    <br><br>
                                                </div>
                                            @endif


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

                </div>
            </div>
        </div>
    </div>
</div>
<style>
    .line-add-h{
        min-height: 180px;
    }
</style>
