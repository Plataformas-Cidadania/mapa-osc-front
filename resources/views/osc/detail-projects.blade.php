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
                                            <p>@if(!empty($projeto->nr_valor_total_projeto)) {{"R$ ".number_format($projeto->nr_valor_total_projeto, 2, ',', '.')}} @endif</p>
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
                                                <div class="line-add line-add-h" >
                                                    <div>
                                                        <h2>Localização do Projeto</h2>
                                                        @foreach($projetos_localizacao as $projeto_localizacao)
                                                            <p>{{$projeto_localizacao->tx_nome_regiao_localizacao_projeto}}</p>
                                                        @endforeach
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="line-add line-add-h">
                                                    <h2>Público Beneficiado</h2>
                                                    @foreach($projetos_beneficiado as $projeto_beneficiado)
                                                        <p>{{$projeto_beneficiado->tx_nome_publico_beneficiado}}</p>
                                                    @endforeach
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="line-add line-add-h">
                                                    <h2>Tipo da Fontes de Recursos</h2>
                                                    @foreach($projetos_recurso as $projeto_recurso)
                                                        <p>{{$projeto_recurso->tx_nome_origem_fonte_recursos_projeto}}</p>
                                                    @endforeach
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-6">
                                        <div class="line-add line-add-h">
                                            <h2>OSCs Parceiras</h2>
                                            @foreach($projetos_parceira as $projeto_parceira)
                                                <p>{{$projeto_parceira->tx_nome_osc_parceira_projeto}}</p>
                                            @endforeach
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="line-add line-add-h">
                                            <h2>Financiadores do Projeto</h2>
                                            @foreach($projetos_financiador as $projeto_financiador)
                                                <p>{{$projeto_financiador->tx_nome_financiador}}</p>
                                            @endforeach
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="line-add line-add-h">
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
                    <p>@if(!empty($projeto->nr_valor_total_projeto)) {{"R$ ".number_format($projeto->nr_valor_total_projeto, 2, ',', '.')}} @endif</p>
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
